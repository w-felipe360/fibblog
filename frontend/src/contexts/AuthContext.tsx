import React, { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../data/fakeUsers";
import api from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
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
      const response = await api.post("/auth/login", { username, password });

      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.token;

        setIsAuthenticated(true);
        setUser(user);

        localStorage.setItem("authToken", token);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.log(err);
      throw new Error("Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post("/users", { name, email, password });

      if (response.status === 201) {
        const user = response.data.user;
        const token = response.data.token;

        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("authToken", token);
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.log(err);
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(undefined);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
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
