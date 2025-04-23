import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import markdownStyles from "./markdownStyles";
import { useTranslation } from "react-i18next";
import GENERATED_CONTENT from "./generated";
import { useRouter } from "expo-router";
import Page from "@/components/layout/Page";

// Esto tiene que corresponderse con los nombres de los archivos .md en la carpeta "static_pages/{idioma}"

export type StaticPages = 
    "AboutUs" |
    "FAQ" |
    "PrivacyPolicy" |
    "TermsAndConditions"


const MarkdownScreen: React.FC<{page: StaticPages}> = ({page}) => {
  const { i18n } = useTranslation(); // Obtener el idioma actual
  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        // Obtener el idioma actual
        const language = i18n.language || "en";

        const pages = GENERATED_CONTENT[language];
        let content = ""
        if (page in pages) {
            content = pages[page];
        } else if(page in GENERATED_CONTENT.en) {
            // Si no existe en el idioma actual, cargar la versión en inglés
            content = pages.en[page];
        } else {
            // Si no existe en inglés, redirigir a la página de inicio
            router.replace("/");
            return;
        }
        setMarkdownContent(content);
      } catch (error) {
        console.error("Error loading markdown file:", error);
        setMarkdownContent("# Error\nUnable to load content.");
      }
    };

    loadMarkdown();
  }, [i18n.language]); // Recargar si cambia el idioma

  return (
    <Page>
      <Markdown style={markdownStyles}>{markdownContent}</Markdown>
    </Page>
  );
};

export default MarkdownScreen;