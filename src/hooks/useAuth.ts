// src/hooks/useAuth.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../services/apiAuth";

export const useAuth = () => {
  const navigate = useNavigate();
  const user = getAuthUser();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return { user, isAuthenticated: !!user };
};
