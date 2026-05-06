import { create } from 'zustand';
import type { Gender, User } from '../types/models';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;

  draftSignup: Partial<User> & { gender?: Gender };

  login: (phone: string) => void;
  logout: () => void;

  setDraft: (patch: Partial<User>) => void;
  completeSignup: () => void;
};

const mockUser: User = {
  id: 'u1',
  name: 'Asha Sharma',
  phone: '+91 9876543210',
  email: 'asha@example.com',
  dob: '10/08/1998',
  gender: 'Female',
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,

  draftSignup: {
    phone: '+91 ',
  },

  login: (phone) => {
    set({
      isAuthenticated: true,
      user: { ...mockUser, phone },
    });
  },
  logout: () => set({ isAuthenticated: false, user: null }),

  setDraft: (patch) =>
    set({ draftSignup: { ...get().draftSignup, ...patch } }),

  completeSignup: () => {
    const draft = get().draftSignup;
    const user: User = {
      id: 'u2',
      name: draft.name ?? 'New User',
      phone: draft.phone ?? '+91 ',
      email: draft.email ?? 'new@example.com',
      dob: draft.dob ?? '01/01/2000',
      gender: (draft.gender as Gender) ?? 'Other',
    };
    set({ isAuthenticated: true, user });
  },
}));

