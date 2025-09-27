import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/apiUsers";

// Fetch single user by ID (fallback)
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const cached = localStorage.getItem(`user-${id}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        getUserById(id).then((fresh) =>
          localStorage.setItem(`user-${id}`, JSON.stringify(fresh))
        );
        return parsed;
      }
      const fresh = await getUserById(id);
      localStorage.setItem(`user-${id}`, JSON.stringify(fresh));
      return fresh;
    },
    enabled: !!id,
  });
};