"use client";

import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ALLOWED_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ? process.env.NEXT_PUBLIC_ADMIN_EMAIL.split(",").map((email) => email.trim().toLowerCase())
  : [];

function isEmailAuthorized(email: string | null): boolean {
  if (!email || ALLOWED_EMAILS.length === 0) return false;
  return ALLOWED_EMAILS.includes(email.toLowerCase());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!auth);
  const [error, setError] = useState<string | null>(
    auth ? null : "Firebase Auth не инициализирован. Проверьте настройки."
  );

  const isAuthorized = user ? isEmailAuthorized(user.email) : false;

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        if (!isEmailAuthorized(user.email)) {
          setError(`Доступ запрещен для ${user.email}`);
        } else {
          setError(null);
        }
      } else {
        setError(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!auth) {
      setError("Ошибка: Сервис авторизации недоступен");
      return;
    }

    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      {/* Force logout if the authenticated user is not on the whitelist */}
      if (!isEmailAuthorized(result.user.email)) {
        await signOut(auth);
        setError(`Доступ запрещен: ${result.user.email} не является админом.`);
      } else {
      }
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
    }
  }, []);

  const logout = useCallback(async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (err: any) {
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthorized, signInWithGoogle, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}