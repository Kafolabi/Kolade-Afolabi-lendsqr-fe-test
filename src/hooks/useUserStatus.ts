import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUser, blacklistUser } from "../services/apiUsers";
import { type User } from "../services/apiUsers";

export const useUserActions = () => {
  const queryClient = useQueryClient();


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
