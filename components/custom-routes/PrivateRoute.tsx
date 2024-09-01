"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const authenticated = isAuthenticated();
  useEffect(() => {
    if (!authenticated) {
      router.push("/login");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;
