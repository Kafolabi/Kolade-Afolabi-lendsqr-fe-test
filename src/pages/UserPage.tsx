import { useState, useMemo, useEffect, useRef } from "react";
import UserCard from "../components/ui/UserCard";
import UserRow from "../features/users/UserRow";
import Pagination from "../components/ui/Pagination";
import FullSpinner from "../components/ui/FullSpinner";
import UserFilter from "../features/users/UserFilters";
import { useFilter } from "../hooks/useFilter";
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
  const [showFilter, setShowFilter] = useState(false);
  const filterWrapperRef = useRef<HTMLDivElement>(null);
  const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);

  const { data: users = [], isLoading, setFilters } = useFilter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterWrapperRef.current &&
        !filterWrapperRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return users.slice(start, start + rowsPerPage);
  }, [users, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(users.length / rowsPerPage) || 1;
  const totalUsers = users.length;

  const noOfActiveUsers = users.filter((u) => u.status === "Active").length;
  const usersWithLoans = users.filter(
    (u) => Number(u.loanRepayment) > 0
  ).length;
  const usersWithSavings = users.filter((u) => Number(u.savings) > 0).length;

  if (isLoading) return <FullSpinner />;

  const tableRows = [
    "ORGANIZATION",
    "USERNAME",
    "EMAIL",
    "PHONE NUMBER",
    "DATE JOINED",
    "STATUS",
  ];

  return (
    <div className="users-page">
      {/* Summary Cards */}
      <div className="user-cards">
        <UserCard icon="👥" label="USERS" value={totalUsers.toLocaleString()} />
        <UserCard
          icon="✅"
          label="ACTIVE USERS"
          value={noOfActiveUsers.toLocaleString()}
        />
        <UserCard
          icon="💰"
          label="USERS WITH LOANS"
          value={usersWithLoans.toLocaleString()}
        />
        <UserCard
          icon="🏦"
          label="USERS WITH SAVINGS"
          value={usersWithSavings.toLocaleString()}
        />
      </div>

      {/* Table */}
      <div
        className="users-table-wrapper"
        style={{ position: "relative" }}
        ref={filterWrapperRef}
      >
        <table className="users-table">
          <thead>
            <tr>
              {tableRows.map((row) => (
                <th key={row} style={{ position: "relative" }}>
                  <span
                    style={{
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    onClick={() =>
                      setOpenFilterColumn((prev) => (prev === row ? null : row))
                    }
                  >
                    {row} <FilterButton />
                  </span>

                  {openFilterColumn === row && (
                    <div className="user-filter open">
                      <UserFilter
                        onFilter={(filters) => {
                          setFilters(filters);
                          setCurrentPage(1);
                          setOpenFilterColumn(null);
                        }}
                        onReset={() => {
                          setFilters({});
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
                  status={
                    ["Active", "Inactive", "Pending", "Blacklisted"].includes(
                      u.status
                    )
                      ? (u.status as
                          | "Active"
                          | "Inactive"
                          | "Pending"
                          | "Blacklisted")
                      : "Inactive"
                  }
                />
              ))
            )}
          </tbody>
        </table>

        {/* UserFilter dropdown */}
        <div className={`user-filter ${showFilter ? "open" : ""}`}>
          <UserFilter
            onFilter={(filters) => {
              setFilters(filters);
              setCurrentPage(1);
              setShowFilter(false);
            }}
            onReset={() => {
              setFilters({});
              setCurrentPage(1);
              setShowFilter(false);
            }}
          />
        </div>
      </div>

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