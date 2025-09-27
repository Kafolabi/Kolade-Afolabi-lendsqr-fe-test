import { useState, useMemo, useRef, useEffect } from "react";
import UserCard from "../components/ui/UserCard";
import UserRow from "../features/users/UserRow";
import Pagination from "../components/ui/Pagination";
import FullSpinner from "../components/ui/FullSpinner";
import UserFilter from "../features/users/UserFilters";
import FilterButton from "../components/ui/FilterButton";
import { useAllUsers } from "../hooks/useUsers"; // the main hook
import "../styles/pages/_usersPage.scss";
import { normalizeStatus } from "../utils/helpers";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>(
    {}
  );

  const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Define the User type
  type User = {
    id: string | number;
    fullName: string;
    organization: string;
    email: string;
    phone: string;
    dateJoined: string;
    status: string;
    loanRepayment?: number | string;
    savings?: number | string;
    [key: string]: string | number | undefined; // For dynamic filter access
  };

  // Fetch all users from React Query
  const { data: usersData = [], isLoading, isError, error } = useAllUsers();

  // Show error toast if fetching users fails
  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch users. Please try again."
      );
    }
  }, [isError, error]);

  // Apply filters on top of fetched users
  const filteredUsers = useMemo(() => {
    let filtered: User[] = [...usersData];

    // Loop through appliedFilters and filter users
    for (const key in appliedFilters) {
      const value = appliedFilters[key];
      if (value) {
        filtered = filtered.filter((u: User) =>
          String(u[key]).toLowerCase().includes(String(value).toLowerCase())
        );
      }
    }

    return filtered;
  }, [usersData, appliedFilters]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const totalUsers = filteredUsers.length;
  const noOfActiveUsers = filteredUsers.filter(
    (u) => u.status === "Active"
  ).length;
  const usersWithLoans = filteredUsers.filter(
    (u) => Number(u.loanRepayment) > 0
  ).length;
  const usersWithSavings = filteredUsers.filter(
    (u) => Number(u.savings) > 0
  ).length;

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openFilterColumn &&
        wrapperRefs.current[openFilterColumn] &&
        !wrapperRefs.current[openFilterColumn]?.contains(event.target as Node)
      ) {
        setOpenFilterColumn(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilterColumn]);

  if (isLoading) return <FullSpinner />;

  const tableRows = [
    "organization",
    "username",
    "email",
    "phone",
    "dateJoined",
    "status",
  ];

  return (
    <div className="users-page">
      <div className="user-cards">
        <UserCard icon="/icon-total-users.png" label="USERS" value={totalUsers.toLocaleString()} />
        <UserCard
          icon="/icon-active-users.png"
          label="ACTIVE USERS"
          value={noOfActiveUsers.toLocaleString()}
        />
        <UserCard
          icon="/loan-users.png"
          label="USERS WITH LOANS"
          value={usersWithLoans.toLocaleString()}
        />
        <UserCard
          icon="/savings-users.png"
          label="USERS WITH SAVINGS"
          value={usersWithSavings.toLocaleString()}
        />
      </div>

      {/* Table */}
      <table className="users-table">
        <thead>
          <tr>
            {tableRows.map((row) => (
              <th
                key={row}
                style={{ position: "relative" }}
                ref={(el) => {
                  wrapperRefs.current[row] = el;
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setOpenFilterColumn(openFilterColumn === row ? null : row)
                  }
                >
                  {row.toUpperCase()} <FilterButton />
                </span>

                {/* Filter dropdown */}
                {openFilterColumn === row && (
                  <div className="user-filter open">
                    <UserFilter
                      onFilter={(filters) => {
                        setAppliedFilters((prev) => ({ ...prev, ...filters }));
                        setCurrentPage(1);
                        setOpenFilterColumn(null);
                      }}
                      onReset={() => {
                        setAppliedFilters({});
                        setCurrentPage(1);
                        setOpenFilterColumn(null);
                      }}
                    />
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            paginatedUsers.map((u) => (
              <UserRow
                key={u.id}
                id={String(u.id)}
                organization={u.organization}
                username={u.fullName}
                email={u.email}
                phone={u.phone}
                date={u.dateJoined}
                status={normalizeStatus(u.status)}
              />
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(num) => {
          setRowsPerPage(num);
          setCurrentPage(1);
        }}
        totalItems={totalUsers}
      />
    </div>
  );
}