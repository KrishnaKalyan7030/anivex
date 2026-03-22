import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: UserRole;
  employeeCode?: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  register: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    role: UserRole;
    employeeCode?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
  resetPassword: (username: string, newPassword: string) => { success: boolean; error?: string };
  userExists: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'anivex_users';
const SESSION_KEY = 'anivex_session';

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch { return []; }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function seedAdmin() {
  const users = getStoredUsers();
  if (!users.find(u => u.username === 'admin')) {
    users.push({
      id: 'admin-001',
      name: 'Anivex Admin',
      username: 'admin',
      email: 'admin@anivex.com',
      phone: '',
      role: 'admin',
      password: 'admin123',
    });
    saveUsers(users);
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    seedAdmin();
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (session) setUser(session);
    } catch {}
  }, []);

  const login = (username: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) return { success: false, error: 'Invalid username or password' };
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const register = (data: {
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    role: UserRole;
    employeeCode?: string;
  }) => {
    const users = getStoredUsers();
    if (users.find(u => u.username === data.username)) {
      return { success: false, error: 'Username already exists' };
    }
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered' };
    }
    if (data.role === 'employee' && data.employeeCode) {
      if (users.find(u => u.employeeCode === data.employeeCode)) {
        return { success: false, error: 'Employee code already in use' };
      }
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone || '',
      role: data.role,
      password: data.password,
      employeeCode: data.employeeCode,
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const resetPassword = (username: string, newPassword: string) => {
    const users = getStoredUsers();
    const idx = users.findIndex(u => u.username === username);
    if (idx === -1) return { success: false, error: 'User not found' };
    users[idx].password = newPassword;
    saveUsers(users);
    return { success: true };
  };

  const userExists = (username: string) => {
    return getStoredUsers().some(u => u.username === username);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === 'admin', resetPassword, userExists }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
