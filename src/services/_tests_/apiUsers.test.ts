import axiosInstance from "../axiosInstance";
import {

getAllUsers,
getUserById,
getFilteredUsers,
activateUser,
blacklistUser,
type User,
type UserFilters,
} from "../apiUsers";

jest.mock("../axiosInstance");

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("apiUsers service", () => {
afterEach(() => {
    jest.clearAllMocks();
});

describe("getAllUsers", () => {
    it("should fetch all users", async () => {
        const users = [{ id: 1, fullName: "John Doe" }] as User[];
        mockedAxios.get.mockResolvedValueOnce({ data: users });

        const result = await getAllUsers();
        expect(mockedAxios.get).toHaveBeenCalledWith("/users");
        expect(result).toEqual(users);
    });
});

describe("getUserById", () => {
    it("should fetch user by id", async () => {
        const user = { id: "123", fullName: "Jane Doe" } as User;
        mockedAxios.get.mockResolvedValueOnce({ data: user });

        const result = await getUserById("123");
        expect(mockedAxios.get).toHaveBeenCalledWith("/users/123");
        expect(result).toEqual(user);
    });
});

describe("getFilteredUsers", () => {
    it("should fetch users with mapped filters", async () => {
        const filters: UserFilters = {
            organization: "Org1",
            username: "Jane",
            email: "jane@example.com",
            phone: "1234567890",
            status: "Active",
        };
        const users = [{ id: 1, fullName: "Jane" }] as User[];
        mockedAxios.get.mockResolvedValueOnce({ data: users });

        const result = await getFilteredUsers(filters);

        expect(mockedAxios.get).toHaveBeenCalledWith("/users", {
            params: {
                organization: "Org1",
                fullName: "Jane",
                email: "jane@example.com",
                phone: "1234567890",
                status: "Active",
            },
        });
        expect(result).toEqual(users);
    });

    it("should filter users by date on frontend", async () => {
        const filters: UserFilters = { date: "2023-12-09" };
        const users = [
            { id: 1, dateJoined: "2023-12-09T10:00:00.000Z" },
            { id: 2, dateJoined: "2023-12-10T10:00:00.000Z" },
        ] as User[];
        mockedAxios.get.mockResolvedValueOnce({ data: users });

        const result = await getFilteredUsers(filters);

        expect(result).toEqual([
            { id: 1, dateJoined: "2023-12-09T10:00:00.000Z" },
        ]);
    });
});

describe("activateUser", () => {
    it("should patch user status to Active", async () => {
        const user = { id: 1, status: "Active" } as User;
        mockedAxios.patch.mockResolvedValueOnce({ data: user });

        const result = await activateUser(1);

        expect(mockedAxios.patch).toHaveBeenCalledWith("/users/1", {
            status: "Active",
        });
        expect(result).toEqual(user);
    });
});

describe("blacklistUser", () => {
    it("should patch user status to Blacklisted", async () => {
        const user = { id: 2, status: "Blacklisted" } as User;
        mockedAxios.patch.mockResolvedValueOnce({ data: user });

        const result = await blacklistUser(2);

        expect(mockedAxios.patch).toHaveBeenCalledWith("/users/2", {
            status: "Blacklisted",
        });
        expect(result).toEqual(user);
    });
});
});