import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserActions } from "../useUserStatus";
import * as apiUsers from "../../services/apiUsers";
import { createElement } from "react";

const createWrapper = () => {
    const queryClient = new QueryClient();
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(
            QueryClientProvider,
            { client: queryClient },
            children
        );
    };
};

describe("useUserActions", () => {
    const user = {
        id: 1,
        status: "active",
        name: "Test User",
        fullName: "Test User",
        organization: "Test Org",
        email: "test@example.com",
        phone: "1234567890",
        dateJoined: "2023-01-01"
    } as apiUsers.User;
    const blacklistedUser = { ...user, status: "blacklisted" };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("activates a user and updates cache", async () => {
        jest.spyOn(apiUsers, "activateUser").mockResolvedValueOnce(user);

        const { result } = renderHook(() => useUserActions(), { wrapper: createWrapper() });

        await act(async () => {
            await new Promise<void>(resolve => {
                result.current.activateUser(user.id, { onSuccess: (_data: apiUsers.User) => resolve() });
            });
        });

        // No error thrown means mutation succeeded
        expect(apiUsers.activateUser).toHaveBeenCalledWith(user.id);
    });

    it("blacklists a user and updates cache", async () => {
        jest.spyOn(apiUsers, "blacklistUser").mockResolvedValueOnce(blacklistedUser);

        const { result } = renderHook(() => useUserActions(), { wrapper: createWrapper() });

        await act(async () => {
            await new Promise<void>(resolve => {
                result.current.blacklistUser(user.id, { onSuccess: (_data: apiUsers.User) => resolve() });
            });
        });

        expect(apiUsers.blacklistUser).toHaveBeenCalledWith(user.id);
    });

    it("handles activateUser error", async () => {
        jest.spyOn(apiUsers, "activateUser").mockRejectedValueOnce(new Error("Activation failed"));

        const { result } = renderHook(() => useUserActions(), { wrapper: createWrapper() });

        let error: unknown;
        await act(async () => {
            await new Promise<void>(resolve => {
                result.current.activateUser(user.id, {
                    onError: (e: unknown) => {
                        error = e;
                        resolve();
                    },
                });
            });
        });

        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Activation failed");
    });

    it("handles blacklistUser error", async () => {
        jest.spyOn(apiUsers, "blacklistUser").mockRejectedValueOnce(new Error("Blacklist failed"));

        const { result } = renderHook(() => useUserActions(), { wrapper: createWrapper() });

        let error: unknown;
        await act(async () => {
            await new Promise<void>(resolve => {
                result.current.blacklistUser(user.id, {
                    onError: (e: unknown) => {
                        error = e;
                        resolve();
                    },
                });
            });
        });

        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("Blacklist failed");
    });
});