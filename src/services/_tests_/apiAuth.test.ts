import { login, logout, getAuthUser, type User } from '../apiAuth';

describe('apiAuth service', () => {
    const user: User = {
        id: "1",
        fullName: "John Doe",
        email: "john@example.com",
        password: "123456"
    };

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('logs in with valid credentials and stores user/token', async () => {
            const result = await login(user.email, user.password);
            expect(result).toEqual({
                id: user.id,
                fullName: user.fullName,
                email: user.email
            });
            expect(localStorage.getItem('authUser')).toBe(JSON.stringify({
                id: user.id,
                fullName: user.fullName,
                email: user.email
            }));
            expect(localStorage.getItem('authToken')).toBe('fake-token');
        });

        it('throws error with invalid credentials', async () => {
            await expect(login('wrong@example.com', 'badpass')).rejects.toThrow('Invalid credentials');
            expect(localStorage.getItem('authUser')).toBeNull();
            expect(localStorage.getItem('authToken')).toBeNull();
        });
    });

    describe('logout', () => {
        it('removes authUser and authToken from localStorage', async () => {
            await login(user.email, user.password);
            logout();
            expect(localStorage.getItem('authUser')).toBeNull();
            expect(localStorage.getItem('authToken')).toBeNull();
        });
    });

    describe('getAuthUser', () => {
        it('returns null if no user is logged in', () => {
            expect(getAuthUser()).toBeNull();
        });

        it('returns the user object if logged in', async () => {
            await login(user.email, user.password);
            const authUser = getAuthUser();
            expect(authUser).toEqual({
                id: user.id,
                fullName: user.fullName,
                email: user.email
            });
        });
    });
});
