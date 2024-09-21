"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { setCookie } from "cookies-next";

//remember to add isUserVerified context

export interface UserDataType {
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
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
}

const AppContext = createContext<AppContextType>({
  token: "",
  isLoggedIn: false,
  isVerified: false,
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
  const [userData, setUserData] = useState(() => {
    // Initial value from localStorage
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("userData")!) || {};
    }
    return {};
  });
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setCookie("token", token, { maxAge: 30 * 24 * 60 * 60 });
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setCookie("token", "");
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      const verified =
        userData?.identity_verified &&
        userData?.is_email_verified &&
        userData?.is_phone_number_verified;
      setIsVerified(Boolean(verified));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const handleLogout = () => {
    setToken("");
    setUserData({});
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
