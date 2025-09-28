import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as apiUsers from "../../services/apiUsers";
jest.mock("../../services/apiUsers");
import { useAllUsers } from "../useUsers";
import { createElement } from "react";

// Helper to wrap hook with QueryClientProvider
const createWrapper = () => {
    const queryClient = new QueryClient();
    return ({ children }: { children: React.ReactNode }) =>
        createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useAllUsers", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return users data on success", async () => {
        const mockUsers = [{ id: 1, name: "John" }];
        jest.spyOn(apiUsers, "getAllUsers").mockResolvedValueOnce(mockUsers);

        const { result } = renderHook(() => useAllUsers(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(mockUsers);
        expect(result.current.isError).toBe(false);
        expect(apiUsers.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it("should handle error when fetching users fails", async () => {
        const error = new Error("Failed to fetch");
        jest.spyOn(apiUsers, "getAllUsers").mockRejectedValueOnce(error);

        const { result } = renderHook(() => useAllUsers(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toBe(error);
        expect(result.current.data).toBeUndefined();
        expect(result.current.isSuccess).toBe(false);
        expect(apiUsers.getAllUsers).toHaveBeenCalledTimes(1);
    });
});