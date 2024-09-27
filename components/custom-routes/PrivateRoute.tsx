"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/context/AppContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
};

export default PrivateRoute;
