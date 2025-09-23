export const authUtils = {
  // Helper para verificar si el usuario está autenticado
  isAuthenticated: (authState: any) => {
    return !!(authState.token && authState.user);
  },
  
  // Helper para obtener el token
  getToken: (authState: any) => {
    return authState.token;
  },
  
  // Helper para obtener el usuario
  getUser: (authState: any) => {
    return authState.user;
  },
};
