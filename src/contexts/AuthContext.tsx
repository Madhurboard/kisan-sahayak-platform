
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Login successful",
        description: "You've been logged in successfully",
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast({
        title: "Login failed",
        description: "There was an error logging in",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "You've been logged out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive",
      });
    }
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
