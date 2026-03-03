import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  department?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'admin') => Promise<boolean>;
  register: (name: string, email: string, password: string, department: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'admin'): Promise<boolean> => {
    const usersKey = role === 'admin' ? 'admins' : 'students';
    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role,
        department: foundUser.department,
        profilePicture: foundUser.profilePicture,
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, department: string): Promise<boolean> => {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    
    // Check if email already exists
    if (students.some((s: any) => s.email === email)) {
      return false;
    }

    const newStudent = {
      id: Date.now().toString(),
      name,
      email,
      password,
      department,
      createdAt: new Date().toISOString(),
      profilePicture: '',
    };

    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // Auto-login after registration
    const userData = {
      id: newStudent.id,
      name,
      email,
      role: 'student' as const,
      department,
      profilePicture: '',
    };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update in students array
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const index = students.findIndex((s: any) => s.id === user.id);
      if (index !== -1) {
        students[index] = { ...students[index], ...updates };
        localStorage.setItem('students', JSON.stringify(students));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
