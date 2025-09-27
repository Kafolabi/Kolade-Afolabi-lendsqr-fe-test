import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/features/_userrow.scss";
import UserDropdown from "./UserDropDown";
import { formatDate } from "../../utils/formatters";

type UserRowProps = {
  id: string; // make sure this is required
  organization: string;
  username: string;
  email: string;
  phone: string;
  date: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
};

export default function UserRow({
  id,
  organization,
  username,
  email,
  phone,
  date,
  status,
}: UserRowProps) {
  const [open, setOpen] = useState(false);
  const actionCellRef = useRef<HTMLTableCellElement | null>(null);
  const navigate = useNavigate();

  // toggle
  function handleDropdownToggle() {
    setOpen((prev) => !prev);
  }

  // close when clicking outside the action cell
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (
        actionCellRef.current &&
        !actionCellRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  return (
    <tr className="user-row">
      <td>{organization}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{formatDate(date)}</td>
      <td>
        <span className={`status status--${status.toLowerCase()}`}>
          {status}
        </span>
      </td>

      {/* action cell is the positioning anchor for the dropdown */}
      <td className="row-action-cell" ref={actionCellRef}>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          className="row-action"
          onClick={handleDropdownToggle}
        >
          ⋮
        </button>

        {/* Dropdown: handlers passed here */}
        <UserDropdown
          open={open}
          onView={() => navigate(`/dashboard/users/${id}`)}
          onBlacklist={() => console.log("Blacklist user", id)}
          onActivate={() => console.log("Activate user", id)}
        />
      </td>
    </tr>
  );
}
