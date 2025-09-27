import { FiEye, FiUserX, FiUserCheck } from "react-icons/fi";

type Props = {
  open: boolean;
  onView?: () => void;
  onBlacklist?: () => void;
  onActivate?: () => void;
};

export default function UserDropdown({
  open,
  onView = () => {},
  onBlacklist = () => {},
  onActivate = () => {},
}: Props) {
  
  return (
    <div className={`user-dropdown ${open ? "open" : ""}`} role="menu">
      <button type="button" onClick={onView}>
        <FiEye /> View Details
      </button>
      <button type="button" onClick={onBlacklist}>
        <FiUserX /> Blacklist User
      </button>
      <button type="button" onClick={onActivate}>
        <FiUserCheck /> Activate User
      </button>
    </div>
  );
}
