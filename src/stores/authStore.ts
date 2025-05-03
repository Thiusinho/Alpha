import { create } from 'zustand';
import { User } from '../types';
import { toast } from 'react-toastify';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Simulated user database with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find user from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = storedUsers.find((u: User) => u.username === username);
        
        if (user) {
          set({ user, isLoggedIn: true, isLoading: false });
          toast.success('Login realizado com sucesso!');
          return true;
        } else {
          set({ isLoading: false });
          toast.error('Usuário ou senha incorretos');
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get stored users
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username or email already exists
        if (storedUsers.some((u: User) => u.username === username)) {
          set({ isLoading: false });
          toast.error('Nome de usuário já existe');
          return false;
        }
        
        if (storedUsers.some((u: User) => u.email === email)) {
          set({ isLoading: false });
          toast.error('Email já está em uso');
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          username,
          email,
          createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
        
        set({ user: newUser, isLoggedIn: true, isLoading: false });
        toast.success('Registro realizado com sucesso!');
        return true;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
        toast.info('Você saiu do sistema');
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn })
    }
  )
);

export { useAuthStore };