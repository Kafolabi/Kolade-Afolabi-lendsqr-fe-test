import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data; // array of 500 users
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(`/users/${id}`);
  return response.data;
};

export interface UserFilters {
  organization?: string;
  username?: string; // frontend input mapped to fullName
  email?: string;
  phone?: string;
  date?: string; // input from type="date", e.g., "2023-12-09"
  status?: string;
}

// Type for a user in your JSON server
export interface User {
  id: string | number;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  dateJoined: string; // ISO string, e.g., "2023-12-09T20:23:28.225Z"
  status: string;
  loanRepayment?: number | string;
  savings?: number | string;
}

export const getFilteredUsers = async (
  filters: UserFilters
): Promise<User[]> => {
  const { date, username, ...restFilters } = filters;

  // Map frontend filter names to backend JSON keys
  const params: Record<string, string> = {};
  if (restFilters.organization) params.organization = restFilters.organization;
  if (username) params.fullName = username; // username → fullName
  if (restFilters.email) params.email = restFilters.email;
  if (restFilters.phone) params.phone = restFilters.phone;
  if (restFilters.status) params.status = restFilters.status;

  // Fetch users filtered by JSON Server params
  const response = await axiosInstance.get<User[]>("/users", { params });
  let users: User[] = response.data;

  // Apply date filter on frontend (ignore time)
  if (date) {
    users = users.filter((u: User) => {
      const userDate = new Date(u.dateJoined).toISOString().split("T")[0];
      return userDate === date; // compare YYYY-MM-DD only
    });
  }

  return users;
};

export const activateUser = async (id: string | number): Promise<User> => {
  const response = await axiosInstance.patch<User>(`/users/${id}`, {
    status: "Active",
  });
  return response.data;
};

export const blacklistUser = async (id: string | number): Promise<User> => {
  const response = await axiosInstance.patch<User>(`/users/${id}`, {
    status: "Blacklisted",
  });
  return response.data;
};



// export const activateUser = async (id: string | number): Promise<User> => {
//   const response = await axiosInstance.patch<User>(`/users/${id}`, {
//     status: "active",
//   });
//   return response.data;
// };

// /**
//  * Blacklist a user (set status to "blacklist")
//  */
// export const blacklistUser = async (id: string | number): Promise<User> => {
//   const response = await axiosInstance.patch<User>(`/users/${id}`, {
//     status: "blacklist",
//   });
//   return response.data;
// };
