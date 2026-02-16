import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'superadmin' | 'admin' | 'teacher' | 'parent';

interface User {
  id: number;
  name: string;
  role: UserRole;
  username: string;
}

interface AuthState {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

// Mock Auth Store using Zustand
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (role) => {
        const mockUsers: Record<UserRole, User> = {
          superadmin: { id: 0, name: 'System Owner', role: 'superadmin', username: 'superadmin' },
          admin: { id: 1, name: 'Principal Lakshmi', role: 'admin', username: 'admin' },
          teacher: { id: 2, name: 'Anjali Ma\'am', role: 'teacher', username: 'teacher' },
          parent: { id: 3, name: 'Mr. Rajesh Kumar', role: 'parent', username: 'parent' },
        };
        set({ user: mockUsers[role] });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'school-auth-storage',
    }
  )
);
