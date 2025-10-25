import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  // Load user from the local storage if exists
  useEffect(() => {
    const raw = localStorage.getItem("app_currentUser");
    if (raw) setCurrentUser(JSON.parse(raw));
    setIsLoading(false); // Mark loading as complete
  }, []);

  const normalizeEmail = (e) => e.trim().toLowerCase();

  const signup = ({
    email,
    password,
    role,
    firstName,
    lastName,
    phone,
    birthday,
    program,
    department
  }) => {
    const users = JSON.parse(localStorage.getItem("app_users") || "[]");
    const e = normalizeEmail(email);

    // duplicate email check
    if (users.some((u) => u.email === e)) {
      throw new Error("Email already registered.");
    }
    // minimal validation
    if (!e || !password || password.length < 6) {
      throw new Error("Invalid email or password too short (min 6).");
    }

    const user = {
      id: crypto.randomUUID(),
      email: e,
      password,
      role,
      firstName,
      lastName,
      phone,
      birthday,
      program,
      department
    };
    users.push(user);
    localStorage.setItem("app_users", JSON.stringify(users));

    const { password: _pw, ...publicUser } = user;
    localStorage.removeItem("app_currentUser", JSON.stringify(publicUser));
    setCurrentUser(null);

    nav("/login", { replace: true });
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("app_users") || "[]");
    const e = normalizeEmail(email);
    const match = users.find((u) => u.email === e && u.password === password);
    if (!match) return false;

    const { password: _pw, ...publicUser } = match;
    localStorage.setItem("app_currentUser", JSON.stringify(publicUser));
    setCurrentUser(publicUser);
    nav(
      publicUser.role === "student" ? "/student-dashboard" : "/admin-dashboard",
      { replace: true }
    );
    return true;
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("app_users") || "[]");

    // Add dummy admin only if no admin exists
    if (!users.some((u) => u.role === "admin")) {
      const adminDummy = [
        {
          firstName: "Admin",
          lastName: "User",
          email: "admin@example.com",
          phone: "123-456-7890",
          birthday: "1990-01-01",
          department: "Software Development (SD)",
          program: "Administration",
          password: "adminpass",
          role: "admin",
          id: crypto.randomUUID(),
        },
      ];

      localStorage.setItem(
        "app_users",
        JSON.stringify([...users, ...adminDummy])
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("app_currentUser");
    setCurrentUser(null);
    nav("/login", { replace: true });
  };

  const setUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, signup, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
