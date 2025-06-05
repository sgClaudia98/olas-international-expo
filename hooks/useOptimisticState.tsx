// hooks/useOptimisticState.ts
import React from "react";
import { useEffect, useState } from "react";

/**
 * Hook para manejar un estado optimista.
 * Permite actualizar el estado de forma optimista y revertirlo en caso de error.
 * ESTO SE PUEDE SUSTITUIR EN LA VERSION 19 DE REACT POR EL NUEVO USE_OPTIMISTIC
 *
 * @param initial - El estado inicial.
 * @returns Un array con el estado actual, una función para actualizar el estado y una función para ejecutar la actualización optimista.
 */

export function useOptimisticState<T>(initial: T) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    // Simular detección de versión (no confiable pero ilustrativo)
    const version = React.version;
    if (version.startsWith("19")) {
      console.warn(
        "[DEPRECATED] useOptimisticState está obsoleto en React 19+. Usa el useOptimistic() oficial."
      );
    }
  }, []);

  const runOptimisticUpdate = async (
    optimistic: (prev: T) => T,
    asyncOperation: () => Promise<any>,
    onError?: (prev: T) => T
  ) => {
    const prevState = state;
    const newState = optimistic(prevState);
    setState(newState);

    try {
      await asyncOperation(); // esperamos confirmación real
    } catch (err) {
      console.error("Revirtiendo optimismo por error:", err);
      if (onError) {
        setState(onError(prevState));
      } else {
        setState(prevState);
      }
    }
  };

  return [state, setState, runOptimisticUpdate] as const;
}

// Ejemplo de uso:
//runOptimisticUpdate(
//    (prev) => prev.filter((m) => m.id !== id), // Optimista: lo saco de la lista
//    () => fetch(`https://api.tusitio.com/methods/${id}`, { method: 'DELETE' }), // Confirmación real
//    (prev) => prev // Si falla, vuelvo al estado anterior
//  );