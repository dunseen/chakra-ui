import { useState } from "react";
import Router from "next/router";
import { useContext, createContext, ReactNode } from "react";
import apiAuth from "../services/apiAuth";

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface SignInCredential {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredential): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredential) {
    try {
      const { data } = await apiAuth.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = data;
      setUser({
        email,
        permissions,
        roles,
      });

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("You must be inside authprovider to use this.");

  return context;
}

export { AuthProvider, useAuth };
