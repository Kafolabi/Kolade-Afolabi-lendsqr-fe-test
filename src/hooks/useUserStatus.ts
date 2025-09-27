// src/hooks/useUserStatus.ts
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { activateUser, blacklistUser } from "../services/apiUsers";

// export const useActivateUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: activateUser,
//     onSuccess: (_, userId) => {
//       // Invalidate queries so the UI updates automatically
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["user", userId] });
//     },
//   });
// };

// export const useBlacklistUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: blacklistUser,
//     onSuccess: (_, userId) => {
//       // Invalidate queries to refresh the UI
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["user", userId] });
//     },
//   });
// };


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUser, blacklistUser } from "../services/apiUsers";
import { type User } from "../services/apiUsers";

export const useUserActions = () => {
  const queryClient = useQueryClient();

  // Activate mutation
//   const {
//     mutate: activateMutate,
//     isPending: activateLoading,
//   } = useMutation({
//     mutationFn: (id: string | number) => activateUser(id),
//     onSuccess: (data: User) => {
//       // update cached users
//       queryClient.invalidateQueries({ queryKey: ["allUsers"] });
//       queryClient.invalidateQueries({ queryKey: ["user", data.id] });
//     },
//   });

const { mutate: activateMutate, isPending: activateLoading } = useMutation({
  mutationFn: (id: string | number) => activateUser(id),
  onSuccess: (data: User) => {
    // update user list immediately
    queryClient.setQueryData<User[]>(["allUsers"], (old = []) =>
      old.map(u => (u.id === data.id ? { ...u, status: data.status } : u))
    );

    // update single user cache
    queryClient.setQueryData<User>(["user", data.id], data);
  },
});


  // Blacklist mutation
//   const {
//     mutate: blacklistMutate,
//     isPending: blacklistLoading,
//   } = useMutation({
//     mutationFn: (id: string | number) => blacklistUser(id),
//     onSuccess: (data: User) => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["user", data.id] });
//     },
//   });
const {
  mutate: blacklistMutate,
  isPending: blacklistLoading,
} = useMutation({
  mutationFn: (id: string | number) => blacklistUser(id),
  onSuccess: (data: User) => {
    // update user list immediately
    queryClient.setQueryData<User[]>(["allUsers"], (old = []) =>
      old.map(u => (u.id === data.id ? { ...u, status: data.status } : u))
    );

    // update single user cache
    queryClient.setQueryData<User>(["user", data.id], data);
  },
});


  return {
    activateUser: activateMutate,
    blacklistUser: blacklistMutate,
    activateLoading,
    blacklistLoading,
  };
};
