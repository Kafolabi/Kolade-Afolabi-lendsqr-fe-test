// src/services/auth.ts
export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

const mockUsers: User[] & { password: string }[] = [
  { id: "1", fullName: "John Doe", email: "john@example.com", password: "123456" },
  { id: "2", fullName: "Jane Smith", email: "jane@example.com", password: "123456" },
];

export const login = async (email: string, password: string) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid credentials");

  const { password: _ignore, ...userWithoutPassword } = user;
  console.log("User logged in:", _ignore, userWithoutPassword);

  localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
  localStorage.setItem("authToken", "fake-token"); // simulate token
  return userWithoutPassword;
};

export const logout = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("authToken");
};

export const getAuthUser = (): User | null => {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};
