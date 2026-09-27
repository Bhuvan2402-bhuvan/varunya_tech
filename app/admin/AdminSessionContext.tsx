"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PanelRole = "ADMIN" | "MANAGER" | "DEVELOPER" | "DESIGNER" | "SALES" | "HR" | "FINANCE";

export interface StaffDetails {
  name: string;
  title: string;
  avatar: string;
}

export const STAFF_DETAILS: Record<PanelRole, StaffDetails> = {
  ADMIN: {
    name: "Marcus Vance",
    title: "Chief Executive Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  MANAGER: {
    name: "Sarah Jenkins",
    title: "Lead Delivery Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  DEVELOPER: {
    name: "Alex Rivera",
    title: "Chief Systems Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  DESIGNER: {
    name: "Elena Rostova",
    title: "Creative Design Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
  SALES: {
    name: "Diana Prince",
    title: "VP of Client Relations",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
  },
  HR: {
    name: "Robert Chen",
    title: "Director of Talent Allocation",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  FINANCE: {
    name: "Warren Vance",
    title: "Chief Financial Officer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
};

interface AdminSessionContextType {
  activeRole: PanelRole | null;
  staff: StaffDetails | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: PanelRole, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: PanelRole) => void;
  verifyPassword: (role: PanelRole, password: string) => boolean;
  updatePassword: (role: PanelRole, newPassword: string) => void;
  rolePasswords: Record<PanelRole, string>;
}

const AdminSessionContext = createContext<AdminSessionContextType | undefined>(undefined);

export function AdminSessionProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<PanelRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rolePasswords, setRolePasswords] = useState<Record<PanelRole, string>>({
    ADMIN: "admin2026",
    MANAGER: "manager2026",
    DEVELOPER: "dev2026",
    DESIGNER: "design2026",
    SALES: "sales2026",
    HR: "hr2026",
    FINANCE: "finance2026",
  });

  useEffect(() => {
    // Load custom passwords if set
    const savedPasswords = localStorage.getItem("velocity_panel_passwords");
    if (savedPasswords) {
      try {
        setRolePasswords(JSON.parse(savedPasswords));
      } catch (e) {
        console.error("Failed to parse role passwords", e);
      }
    }

    const savedRole = localStorage.getItem("velocity_panel_role");
    const token = localStorage.getItem("velocity_panel_token");

    if (savedRole && token === `token_${savedRole}`) {
      setActiveRole(savedRole as PanelRole);
    }
    setIsLoading(false);
  }, []);

  const login = async (role: PanelRole, password: string): Promise<boolean> => {
    // Artificial slight network latency for security UI feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (rolePasswords[role] === password) {
      localStorage.setItem("velocity_panel_role", role);
      localStorage.setItem("velocity_panel_token", `token_${role}`);
      setActiveRole(role);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("velocity_panel_role");
    localStorage.removeItem("velocity_panel_token");
    setActiveRole(null);
  };

  const switchRole = (role: PanelRole) => {
    localStorage.setItem("velocity_panel_role", role);
    localStorage.setItem("velocity_panel_token", `token_${role}`);
    setActiveRole(role);
  };

  const verifyPassword = (role: PanelRole, password: string): boolean => {
    return rolePasswords[role] === password;
  };

  const updatePassword = (role: PanelRole, newPassword: string) => {
    setRolePasswords((prev) => {
      const updated = { ...prev, [role]: newPassword };
      localStorage.setItem("velocity_panel_passwords", JSON.stringify(updated));
      return updated;
    });
  };

  const staff = activeRole ? STAFF_DETAILS[activeRole] : null;

  return (
    <AdminSessionContext.Provider
      value={{
        activeRole,
        staff,
        isAuthenticated: activeRole !== null,
        isLoading,
        login,
        logout,
        switchRole,
        verifyPassword,
        updatePassword,
        rolePasswords,
      }}
    >
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  const context = useContext(AdminSessionContext);
  if (context === undefined) {
    throw new Error("useAdminSession must be used within an AdminSessionProvider");
  }
  return context;
}
