export function areArraysEqual<T>(array1: T[], array2: T[]): boolean {
  
    if (array1.length !== array2.length) {
      return false; // Si no tienen la misma longitud, no son iguales
    }
  
    return array1.every((value, index) => value === array2[index]);
  }

export function getLastElement<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
        return undefined; // Manejo del caso en que el array está vacío.
    }
    return arr[arr.length - 1];
}
