import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from '../useUser';
import * as apiUsers from '../../services/apiUsers';
import { createElement } from 'react';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});
describe('useUser', () => {
    const userId = '123';
    const userData = {
        id: userId,
        fullName: 'Test User',
        organization: 'Test Org',
        email: 'test@example.com',
        phone: '1234567890',
        dateJoined: '2023-01-01T00:00:00.000Z',
        status: 'Active'
    };

    let queryClient: QueryClient;

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        queryClient = new QueryClient();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };

    it('fetches user from API and caches it if not in localStorage', async () => {
        jest.spyOn(apiUsers, 'getUserById').mockResolvedValueOnce(userData);

        const { result } = renderHook(() => useUser(userId), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(apiUsers.getUserById).toHaveBeenCalledWith(userId);
        localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
        // No further code here; close this test block.
    });

    it('returns cached user from localStorage and updates cache in background', async () => {
        localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
        const freshUser = {
            id: userId,
            fullName: 'Fresh User',
            organization: 'Test Org',
            email: 'fresh@example.com',
            phone: '0987654321',
            dateJoined: '2023-01-02T00:00:00.000Z',
            status: 'Active'
        };
        jest.spyOn(apiUsers, 'getUserById').mockResolvedValueOnce(freshUser);

        const { result } = renderHook(() => useUser(userId), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(localStorage.getItem).toHaveBeenCalledWith(`user-${userId}`);
        expect(result.current.data).toEqual(userData);

        // Wait for background update
        await act(async () => {
            await Promise.resolve();
        });

        expect(apiUsers.getUserById).toHaveBeenCalledWith(userId);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            `user-${userId}`,
            JSON.stringify(freshUser)
        );
    });
    it('does not run query if id is falsy', () => {
        const { result } = renderHook(() => useUser(''), { wrapper });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toBeUndefined();
        expect(apiUsers.getUserById).not.toHaveBeenCalled();
    });

    it('handles API error gracefully', async () => {
        jest.spyOn(apiUsers, 'getUserById').mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => useUser(userId), { wrapper });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error && result.current.error.message).toBe('API Error');
    });
});