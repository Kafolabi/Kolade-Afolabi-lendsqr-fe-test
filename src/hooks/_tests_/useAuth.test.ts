import { renderHook } from "@testing-library/react";
import { useAuth } from "../useAuth";
import * as apiAuth from "../../services/apiAuth";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("useAuth hook", () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user and isAuthenticated=true when user exists", () => {
    const mockUser = {
      id: "1",
      fullName: "Test User",
      email: "test@example.com",
      password: "password123",
    };
    jest.spyOn(apiAuth, "getAuthUser").mockReturnValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper: MemoryRouter });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should redirect to /login and isAuthenticated=false when user does not exist", () => {
    jest.spyOn(apiAuth, "getAuthUser").mockReturnValue(null);

    renderHook(() => useAuth(), { wrapper: MemoryRouter });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should not redirect if user exists", () => {
    const mockUser = {
      id: "2",
      fullName: "Jane Doe",
      email: "jane@example.com",
      password: "password456",
    };
    jest.spyOn(apiAuth, "getAuthUser").mockReturnValue(mockUser);

    renderHook(() => useAuth(), { wrapper: MemoryRouter });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
