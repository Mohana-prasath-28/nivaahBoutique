import { create } from "zustand";

export type User = {
  name: string;
  email?: string;
  phone?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user) => set({ user, token: "mock-token" }),
  logout: () => set({ user: null, token: null }),
  setUser: (user) => set({ user }),
}));

