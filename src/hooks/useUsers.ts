
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../services/apiUsers";

// Fetch all users at once
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers
  });
};

