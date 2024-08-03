"use client";
import { createContext, useContext, useState, useEffect } from "react";

//remember to add isUserVerified context

interface UserDataType {
  accessToken?: string;
  bio?: string;
  created_at?: string;
  email?: string;
  first_name?: string;
  id?: number;
  identity_verified?: boolean | null;
  image_url?: string | null;
  is_email_verified?: boolean | null;
  is_phone_number_verified?: boolean | null;
  last_name?: string;
  password?: string;
  phone_number?: string | null;
  updated_at?: string;
}

interface AppContextType {
  token: string;
  isLoggedIn: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  handleLogout: () => void;
  userData: UserDataType;
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
}

const AppContext = createContext<AppContextType>({
  token: "",
  isLoggedIn: false,
  isVerified: false,
  setIsVerified: () => {},
  setToken: () => {},
  handleLogout: () => {},
  userData: {},
  setUserData: () => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>(() => {
    // Initial value from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || "";
    }
    return "";
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);
  const [userData, setUserData] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        handleLogout,
        setUserData,
        userData,
        isVerified,
        setIsVerified,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
