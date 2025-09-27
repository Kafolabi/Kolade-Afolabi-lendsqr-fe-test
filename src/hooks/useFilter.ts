import type { UserFilters } from "../services/apiUsers";
import { getFilteredUsers } from "../services/apiUsers";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

// Custom hook to manage user filters and fetch filtered users
export const useFilter = () => {
  const [filters, setFilters] = useState<UserFilters>({});
  const debouncedFilters = useDebounce(filters, 300); // Debounce filter changes by 300ms

  const { data, isLoading } = useQuery({
    queryKey: ["filteredUsers", debouncedFilters],
    queryFn: () => getFilteredUsers(debouncedFilters),
    enabled: !!debouncedFilters,
  });

  return { data, isLoading, filters, setFilters };
};
