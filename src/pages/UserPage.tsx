import { useState } from "react";
import UserCard from "../components/ui/UserCard";
import UserRow from "../features/users/UserRow";
// import UserFilter from "../features/users/UserFilters";

import Pagination from "../components/ui/Pagination";
import "../styles/pages/_usersPage.scss";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const users = [
    {
      organization: "Lendsqr",
      username: "Grace Effiom",
      email: "grace@lendstar.com",
      phone: "07060780922",
      date: "Apr 30, 2020 10:00 AM",
      status: "Active" as const,
    },
    {
      organization: "Irorun",
      username: "Debby Ogana",
      email: "debby@irorun.com",
      phone: "08160780928",
      date: "Apr 30, 2020 10:00 AM",
      status: "Pending" as const,
    },
    {
      organization: "Irorun",
      username: "Debby Ogana",
      email: "debby@irorun.com",
      phone: "08160780928",
      date: "Apr 30, 2020 10:00 AM",
      status: "Inactive" as const,
    },
    {
      organization: "Lendsqr",
      username: "Grace Effiom",
      email: "grace@lendstar.com",
      phone: "07060780922",
      date: "Apr 30, 2020 10:00 AM",
      status: "Blacklisted" as const,
    },
    {
      organization: "Lendsqr",
      username: "Grace Effiom",
      email: "grace@lendstar.com",
      phone: "07060780922",
      date: "Apr 30, 2020 10:00 AM",
      status: "Active" as const,
    },
    {
      organization: "Irorun",
      username: "Debby Ogana",
      email: "debby@irorun.com",
      phone: "08160780928",
      date: "Apr 30, 2020 10:00 AM",
      status: "Pending" as const,
    },
    {
      organization: "Irorun",
      username: "Debby Ogana",
      email: "debby@irorun.com",
      phone: "08160780928",
      date: "Apr 30, 2020 10:00 AM",
      status: "Inactive" as const,
    },
    {
      organization: "Lendsqr",
      username: "Grace Effiom",
      email: "grace@lendstar.com",
      phone: "07060780922",
      date: "Apr 30, 2020 10:00 AM",
      status: "Blacklisted" as const,
    },
    {
      organization: "Lendsqr",
      username: "Grace Effiom",
      email: "grace@lendstar.com",
      phone: "07060780922",
      date: "Apr 30, 2020 10:00 AM",
      status: "Active" as const,
    },
    {
      organization: "Irorun",
      username: "Debby Ogana",
      email: "debby@irorun.com",
      phone: "08160780928",
      date: "Apr 30, 2020 10:00 AM",
      status: "Pending" as const,
    },
    {
      organization: "Irorun",
      username: "Debby Ogana",
      email: "debby@irorun.com",
      phone: "08160780928",
      date: "Apr 30, 2020 10:00 AM",
      status: "Inactive" as const,
    },
    {
      organization: "Lendsqr",
      username: "Grace Effiom",
      email: "grace@lendstar.com",
      phone: "07060780922",
      date: "Apr 30, 2020 10:00 AM",
      status: "Blacklisted" as const,
    },
  ];

  // Pagination logic
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="users-page">
      {/* Top summary cards */}
      <div className="user-cards">
        <UserCard icon={"👥"} label="USERS" value="2,453" />
        <UserCard icon={"✅"} label="ACTIVE USERS" value="2,453" />
        <UserCard icon={"💰"} label="USERS WITH LOANS" value="12,453" />
        <UserCard icon={"🏦"} label="USERS WITH SAVINGS" value="102,453" />
      </div>

      {/* Filters (optional) */}
      {/* <UserFilter onFilter={(f) => console.log(f)} onReset={() => {}} /> */}

      {/* Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ORGANIZATION</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>PHONE NUMBER</th>
            <th>DATE JOINED</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u, i) => (
            <UserRow key={i} {...u} />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="user-page">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(num) => {
            setRowsPerPage(num);
            setCurrentPage(1); // reset to first page when rowsPerPage changes
          }}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
