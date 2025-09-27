import { useState, useMemo, useRef, useEffect } from "react";
import UserCard from "../components/ui/UserCard";
import UserRow from "../features/users/UserRow";
import Pagination from "../components/ui/Pagination";
import FullSpinner from "../components/ui/FullSpinner";
import UserFilter from "../features/users/UserFilters";
import { useFilter } from "../hooks/useFilter";
import { useReset } from "../hooks/useReset";
import "../styles/pages/_usersPage.scss";
import FilterButton from "../components/ui/FilterButton";

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
};

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);

  const { data: users = [], isLoading, setFilters } = useFilter();
  
  // Use the reset hook
  const { resetFilters } = useReset({
    setFilters,
    setCurrentPage,
    setOpenFilterColumn,
    setRowsPerPage,
    initialRowsPerPage: 10
  });

  // Close filter when clicking outside
  const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return users.slice(start, start + rowsPerPage);
  }, [users, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(users.length / rowsPerPage) || 1;
  const totalUsers = users.length;
  const noOfActiveUsers = users.filter((u) => u.status === "Active").length;
  const usersWithLoans = users.filter((u) => Number(u.loanRepayment) > 0).length;
  const usersWithSavings = users.filter((u) => Number(u.savings) > 0).length;

  if (isLoading) return <FullSpinner />;

  const tableRows = ["ORGANIZATION", "USERNAME", "EMAIL", "PHONE NUMBER", "DATE JOINED", "STATUS"];

  return (
    <div className="users-page">
      {/* Summary Cards */}
      <div className="user-cards">
        <UserCard icon="👥" label="USERS" value={totalUsers.toLocaleString()} />
        <UserCard icon="✅" label="ACTIVE USERS" value={noOfActiveUsers.toLocaleString()} />
        <UserCard icon="💰" label="USERS WITH LOANS" value={usersWithLoans.toLocaleString()} />
        <UserCard icon="🏦" label="USERS WITH SAVINGS" value={usersWithSavings.toLocaleString()} />
      </div>

      {/* Table */}
      <table className="users-table">
        <thead>
          <tr>
            {tableRows.map((row) => (
              <th key={row} style={{ position: "relative" }} ref={(el) => (wrapperRefs.current[row] = el)}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenFilterColumn(openFilterColumn === row ? null : row)}
                >
                  {row} <FilterButton />
                </span>

                {/* Filter dropdown */}
                {openFilterColumn === row && (
                  <div className="user-filter open">
                    <UserFilter
                      onFilter={(filters) => {
                        setFilters(filters);
                        setCurrentPage(1);
                        setOpenFilterColumn(null);
                      }}
                      onReset={resetFilters}
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
                status={["Active", "Inactive", "Pending", "Blacklisted"].includes(u.status) ? (u.status as "Active" | "Inactive" | "Pending" | "Blacklisted") : "Inactive"}
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