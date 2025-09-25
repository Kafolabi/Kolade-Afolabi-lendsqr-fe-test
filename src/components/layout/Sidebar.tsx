import "../../styles/components/_sidebar.scss";
import {
  FiUsers,
  FiBriefcase,
  FiHome,
  FiSettings,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";

function Sidebar() {
  // --- Menu Data ---
  const mainMenu = [{ icon: <FiHome />, label: "Dashboard" }];

  const customerMenu = [
    { icon: <FiUsers />, label: "Users" },
    { icon: <FiUser />, label: "Guarantors" },
    { icon: <FiUsers />, label: "Loans" },
    { icon: <FiUsers />, label: "Decision Models" },
    { icon: <FiUsers />, label: "Savings" },
    { icon: <FiUsers />, label: "Loan Requests" },
    { icon: <FiUsers />, label: "Whitelist" },
    { icon: <FiUsers />, label: "Karma" },
  ];

  const businessMenu = [
    { icon: <FiUsers />, label: "Organization" },
    { icon: <FiUser />, label: "Loan Products" },
    { icon: <FiUsers />, label: "Savings Products" },
    { icon: <FiUsers />, label: "Fees and Charges" },
    { icon: <FiUsers />, label: "Transactions" },
    { icon: <FiUsers />, label: "Services" },
    { icon: <FiUsers />, label: "Service Account" },
    { icon: <FiUsers />, label: "Settlements" },
    { icon: <FiUsers />, label: "Reports" },
  ];

  const settingsMenu = [
    { icon: <FiSettings />, label: "Preferences" },
    { icon: <FiSettings />, label: "Fees and Pricing" },
    { icon: <FiSettings />, label: "Audit Logs" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <button className="sidebar__org">
          <FiBriefcase /> Switch Organization
        </button>
        <nav>
          <ul>
            {mainMenu.map((item, idx) => (
              <li key={idx}>
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar__section">
        <p className="sidebar__title">Customers</p>
        <ul>
          {customerMenu.map((item, idx) => (
            <li key={idx} className={item.label === "Users" ? "active" : ""}>
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__section">
        <p className="sidebar__title">Businesses</p>
        <ul>
          {businessMenu.map((item, idx) => (
            <li key={idx}>
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar__section">
        <p className="sidebar__title">Settings</p>
        <ul>
          {settingsMenu.map((item, idx) => (
            <li key={idx}>
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
