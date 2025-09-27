import { renderHook, act, waitFor } from "@testing-library/react";
import { useFilter } from "../useFilter";
import * as apiUsers from "../../services/apiUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Mock getFilteredUsers
jest.mock("../../services/apiUsers", () => ({
    getFilteredUsers: jest.fn(),
}));

const mockUsers = [{ id: 1, name: "John" }];

function wrapper({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

describe("useFilter", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with empty filters and no data", async () => {
        (apiUsers.getFilteredUsers as jest.Mock).mockResolvedValue([]);
        const { result } = renderHook(() => useFilter(), { wrapper });

        expect(result.current.filters).toEqual({});
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeUndefined();
    });

    it("should fetch filtered users when filters are set", async () => {
        (apiUsers.getFilteredUsers as jest.Mock).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => useFilter(), { wrapper });

        act(() => {
            result.current.setFilters({ /* replace 'name' with a valid UserFilters property, e.g., 'username' */ username: "John" });
        });

        // Wait for debounce and query
        await waitFor(() => {
            expect(apiUsers.getFilteredUsers).toHaveBeenCalledWith({ name: "John" });
            expect(result.current.data).toEqual(mockUsers);
        });
    });

    it("should debounce filter changes", async () => {
        jest.useFakeTimers();
        (apiUsers.getFilteredUsers as jest.Mock).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => useFilter(), { wrapper });

        act(() => {
            result.current.setFilters({ username: "Jaime Boyer" });
            result.current.setFilters({ username: "Edna Farrell" });
        });

        // Fast-forward debounce timer
        jest.advanceTimersByTime(300);

        await waitFor(() => {
            expect(apiUsers.getFilteredUsers).toHaveBeenCalledWith({ username: "Edna Farrell" });
        });

        jest.useRealTimers();
    });

    it("should handle API errors gracefully", async () => {
        (apiUsers.getFilteredUsers as jest.Mock).mockRejectedValue(new Error("API Error"));

        const { result } = renderHook(() => useFilter(), { wrapper });

        act(() => {
            result.current.setFilters({ username: "Error" });
        });

        await waitFor(() => {
            expect(result.current.data).toBeUndefined();
            // isLoading should eventually be false after error
            expect(result.current.isLoading).toBe(false);
        });
    });

    it("should not fetch if filters are empty", async () => {
        (apiUsers.getFilteredUsers as jest.Mock).mockResolvedValue(mockUsers);

        const { result } = renderHook(() => useFilter(), { wrapper });

        expect(apiUsers.getFilteredUsers).not.toHaveBeenCalled();
        expect(result.current.data).toBeUndefined();
    });
});