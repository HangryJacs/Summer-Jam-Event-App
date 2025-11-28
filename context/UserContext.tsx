
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserData, ActivationStatus } from '../types';
import { STORAGE_KEYS } from '../constants';

// Initial Activations State
const INITIAL_ACTIVATIONS: ActivationStatus[] = [
  { id: 'nike', name: 'Nike Court', completed: false, type: 'Challenge' },
  { id: 'footlocker', name: 'Foot Locker', completed: false, type: 'Retail' },
  { id: 'maybelline', name: 'Maybelline', completed: false, type: 'Experience' },
  { id: 'gyg', name: 'Guzman y Gomez', completed: false, type: 'Food' },
  { id: 'jordan', name: 'Jordan Hangar', completed: false, type: 'VIP' },
  { id: 'entry', name: 'Entry Survey', completed: false, type: 'Feedback' },
  { id: 'exit', name: 'Exit Survey', completed: false, type: 'Feedback' },
];

interface UserContextType {
  user: UserData | null;
  activations: ActivationStatus[];
  login: (userData: UserData) => void;
  logout: () => void;
  addEntries: (amount: number) => void;
  markActivationCompleted: (id: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [activations, setActivations] = useState<ActivationStatus[]>(INITIAL_ACTIVATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }

        const storedActivations = localStorage.getItem('summerjam_activations');
        if (storedActivations) {
          setActivations(JSON.parse(storedActivations));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    
    // Listen for storage events (cross-tab or cross-component sync)
    // This allows forms to update localStorage directly and the context to pick it up
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persistence helpers
  const saveUser = (userData: UserData | null) => {
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    setUser(userData);
  };

  const saveActivations = (newActivations: ActivationStatus[]) => {
    localStorage.setItem('summerjam_activations', JSON.stringify(newActivations));
    setActivations(newActivations);
  };

  // Actions
  const login = (userData: UserData) => {
    // Initialize entries if new user
    const userWithEntries = { ...userData, entries: (userData as any).entries || 0 };
    saveUser(userWithEntries);
  };

  const logout = () => {
    saveUser(null);
    saveActivations(INITIAL_ACTIVATIONS);
  };

  const addEntries = (amount: number) => {
    if (!user) return;
    const currentEntries = (user as any).entries || 0;
    const updatedUser = { ...user, entries: currentEntries + amount };
    saveUser(updatedUser);
  };

  const markActivationCompleted = (id: string) => {
    const updatedActivations = activations.map(act => 
      act.id === id ? { ...act, completed: true } : act
    );
    saveActivations(updatedActivations);
  };

  return (
    <UserContext.Provider value={{
      user,
      activations,
      login,
      logout,
      addEntries,
      markActivationCompleted,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
