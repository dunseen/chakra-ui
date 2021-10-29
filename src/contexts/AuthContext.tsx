import { useState, useEffect } from "react";
import Router from "next/router";
import { useContext, createContext, ReactNode } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
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

export function signOut() {
  destroyCookie(undefined, "dashgo.token");
  destroyCookie(undefined, "dashgo.refreshToken");

  Router.push("/");
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

    if (token) {
      apiAuth
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredential) {
    try {
      const { data } = await apiAuth.post("sessions", {
        email,
        password,
      });

      const { permissions, roles, token, refreshToken } = data;

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30d
        path: "/",
      });
      setCookie(undefined, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30d
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      apiAuth.defaults.headers["Authorization"] = `Bearer ${token}`;

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
