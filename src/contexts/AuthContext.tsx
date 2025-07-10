import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";

// 1. Define the context type
interface AuthContextType {
  currentUser: User | null;
  userLoggedin: boolean;
  loading: boolean;
}

// 2. Create the context with default value
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userLoggedin: false,
  loading: true,
});

// 3. Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

// 4. AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedin, setUserLoggedin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedin(true);
      } else {
        setCurrentUser(null);
        setUserLoggedin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userLoggedin,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
