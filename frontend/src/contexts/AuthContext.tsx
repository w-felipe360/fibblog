import React, { createContext, ReactNode, useContext, useState } from "react";
import { fakeUsers, User } from "../data/fakeUsers";
// import api from "../services/api"; // importar o serviço de API

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  user?: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async (username: string, password: string) => {
    try {
      console.log(username, password);

      // Exemplo de chamada à API real
      // const response = await api.post("/api/login", { username, password });

      // Verificar o status da resposta
      // if (response.status === 200) {
      //   // A resposta vai conter o usuário
      //   const user = response.data.user;
      //   setIsAuthenticated(true);
      //   setUser(user);
      // } else {
      //   throw new Error("Login failed");
      // }

      // Simulação da chamada de API para fins de desenvolvimento
      const userData = fakeUsers[username];
      if (userData && userData.password === password) {
        setIsAuthenticated(true);
        setUser(userData.user);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.log(err);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useUser = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("useUser must be used within an authenticated context");
  }
  return user;
};
