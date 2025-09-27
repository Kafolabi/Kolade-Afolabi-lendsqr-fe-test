
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../services/apiUsers";

// Fetch all users at once
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers
  });
};

// Fetch single user by ID (fallback)
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
