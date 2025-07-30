import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔽 Bu satır: hook fonksiyonu
export const useAuth = () => useContext(AuthContext);
