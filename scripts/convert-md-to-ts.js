const fs = require("fs");
const path = require("path");

const languages = ["en", "es", "pt", "fr"];

console.warn(`Este script convertirá archivos .md a .ts. Para los idiomas: ${languages.join("-")}.`);

const inputDir = path.join(__dirname, "../", "static_pages"); // Directorio de entrada
const outputDir = path.join(__dirname, "../", "static_pages", "generated"); // Directorio de salida
const indexFilePath = path.join(outputDir, "index.ts"); // Ruta del archivo index.ts

// Función para limpiar el directorio de salida
const cleanDirectory = (dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Eliminar archivo
      } else if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true }); // Eliminar subdirectorio
      }
    });
  }
};

// Asegúrate de que el directorio de salida exista y esté limpio
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
} else {
  cleanDirectory(outputDir); // Limpiar el directorio si ya existe
}

// Función para obtener el contenido del primer idioma como fallback
const getFallbackContent = (fallbackLang) => {
  const fallbackDir = path.join(inputDir, fallbackLang);
  const files = fs.readdirSync(fallbackDir).filter((file) => file.endsWith(".md"));

  return files.reduce((acc, file) => {
    const filePath = path.join(fallbackDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const variableName = path.basename(file, ".md").replace(/[^a-zA-Z0-9]/g, "_");
    acc[variableName] = content;
    return acc;
  }, {});
};

// Obtener el contenido del primer idioma como fallback
const fallbackLang = languages[0];
if (!fs.existsSync(path.join(inputDir, fallbackLang))) {
  console.error(`El directorio para el idioma de fallback (${fallbackLang}) no existe. Abortando.`);
  process.exit(1);
}
const fallbackContent = getFallbackContent(fallbackLang);

let indexExports = []; // Para construir el archivo index.ts

languages.forEach((language) => {
  const langDir = path.join(inputDir, language); // Directorio para cada idioma
  const outputFilePath = path.join(outputDir, `${language}.ts`); // Archivo de salida

  let exports = [];

  if (!fs.existsSync(langDir)) {
    console.warn(`El directorio para el idioma ${language} no existe. Usando contenido de fallback (${fallbackLang}).`);
    exports = Object.entries(fallbackContent).map(
      ([variableName, content]) => `export const ${variableName} = \`${content}\`;`
    );
  } else {
    // Leer todos los archivos .md en el directorio del idioma
    const files = fs.readdirSync(langDir).filter((file) => file.endsWith(".md"));

    if (files.length === 0) {
      console.warn(`No se encontraron archivos .md para el idioma ${language}. Usando contenido de fallback (${fallbackLang}).`);
      exports = Object.entries(fallbackContent).map(
        ([variableName, content]) => `export const ${variableName} = \`${content}\`;`
      );
    } else {
      // Generar las exportaciones para cada archivo .md
      exports = files.map((file) => {
        const filePath = path.join(langDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const variableName = path.basename(file, ".md").replace(/[^a-zA-Z0-9]/g, "_"); // Asegurar nombres válidos
        return `export const ${variableName} = \`${content}\`;`;
      });
    }
  }

  // Crear el contenido del archivo .ts
  const outputContent = `// Archivo generado automáticamente. No editar manualmente.\n\n${exports.join("\n\n")}`;

  // Escribir el archivo .ts
  fs.writeFileSync(outputFilePath, outputContent, "utf-8");

  console.log(`Generado: ${outputFilePath}`);

  // Agregar al archivo index.ts
  indexExports.push(`import * as ${language} from "./${language}";`);
});

// Crear el contenido del archivo index.ts
const indexContent = `// Archivo generado automáticamente. No editar manualmente.\n\n${indexExports.join(
  "\n"
)}\n\nconst screensByLanguage = {\n${languages
  .map((lang) => `  ${lang},`)
  .join("\n")}\n};\n\nexport default screensByLanguage;`;

// Escribir el archivo index.ts
fs.writeFileSync(indexFilePath, indexContent, "utf-8");

console.log(`Generado: ${indexFilePath}`);