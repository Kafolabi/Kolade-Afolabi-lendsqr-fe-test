import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/apiUsers";

// Fetch all users at once with error handling
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
};
