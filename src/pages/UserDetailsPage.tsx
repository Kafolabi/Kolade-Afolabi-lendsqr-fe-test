import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "../styles/pages/_userDetailsPage.scss";
import UserDetailsInfoSection from "../components/ui/UserDetailsInfoSection";
import { formatCurrency } from "../utils/formatters";
import StarRating from "../components/ui/StarRating";
import { useUserActions } from "../hooks/useUserStatus";
import FullSpinner from "../components/ui/FullSpinner";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useUser(id!);
  const {
    activateUser,
    blacklistUser,
    activateLoading: isActivating,
    blacklistLoading: isBlacklisting,
  } = useUserActions();

  if (isLoading) return <FullSpinner />;
  if (isError || !user) return <p>User not found</p>;

  return (
    <div className="user-details">
      {/* Header */}
      <div className="top-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="arrow">&larr;</span>
          <span className="text">Back to Users</span>
        </button>
      </div>

      <div className="user-header">
        <h2>User Details</h2>
        <div className="actions">
          {user.status !== "Blacklisted" && (
            <button
              className="btn-outline-red"
              onClick={() => blacklistUser(user.id)}
              disabled={isBlacklisting}
            >
              {isBlacklisting ? "Blacklisting..." : "BLACKLIST USER"}
            </button>
          )}
          {user.status !== "Active" && (
            <button
              className="btn-outline-green"
              onClick={() => activateUser(user.id)}
              disabled={isActivating}
            >
              {isActivating ? "Activating..." : "ACTIVATE USER"}
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.04053 35.1796C6.47961 32.2202 7.79365 29.6264 9.97961 27.4C12.7405 24.6 16.0732 23.2 19.9796 23.2C23.886 23.2 27.2204 24.6 29.9796 27.4C32.1796 29.6266 33.5062 32.2204 33.9593 35.1796M28.1405 14.0204C28.1405 16.247 27.3468 18.1532 25.7593 19.7408C24.1734 21.3408 22.253 22.1408 20.0001 22.1408C17.7594 22.1408 15.8409 21.3408 14.2409 19.7408C12.6534 18.1533 11.8596 16.247 11.8596 14.0204C11.8596 11.7673 12.6534 9.84679 14.2409 8.25959C15.8409 6.67367 17.7596 5.87991 20.0001 5.87991C22.2532 5.87991 24.1737 6.67367 25.7593 8.25959C27.3468 9.84711 28.1405 11.7674 28.1405 14.0204Z"
              stroke="#213F7D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3>{user.fullName}</h3>
          <p>{user.id.toString().padStart(10, "0")}</p>
        </div>

        <div>
          <p>User's Tier</p>
          <p>
            <StarRating rating={user?.bvn ? 3 : 1} />
          </p>
        </div>
        <div>
          <h3>{formatCurrency(user.monthlyIncome)}</h3>
          <p>{`${user.bvn}/${user.organization}`}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="active">General Details</button>
        <button>Documents</button>
        <button>Bank Details</button>
        <button>Loans</button>
        <button>Savings</button>
        <button>App and System</button>
      </div>

      {/* General Details */}
      <div className="general-details">
        <UserDetailsInfoSection
          title="Personal Information"
          items={[
            { label: "Full Name", value: user.fullName },
            { label: "Phone Number", value: user.phone },
            { label: "Email Address", value: user.email },
            { label: "BVN", value: user.bvn },
            { label: "Gender", value: user.gender },
            { label: "Marital Status", value: user.maritalStatus },
            { label: "Children", value: user.children },
            { label: "Type of Residence", value: user.residence },
          ]}
        />{" "}
        <hr />
        <UserDetailsInfoSection
          title="Education and Employment"
          items={[
            { label: "Level of Education", value: user.education },
            { label: "Employment Status", value: user.employmentStatus },
            { label: "Sector of Employment", value: user.sector },
            { label: "Duration of Employment", value: user.duration },
            { label: "Office Email", value: user.email },
            {
              label: "Monthly Income",
              value: formatCurrency(user.monthlyIncome),
            },
            {
              label: "Loan Repayment",
              value: formatCurrency(user.loanRepayment),
            },
          ]}
        />{" "}
        <hr />
        <UserDetailsInfoSection
          title="Socials"
          items={[
            { label: "Twitter", value: user.socials.twitter },
            { label: "Facebook", value: user.socials.facebook },
            { label: "Instagram", value: user.socials.instagram },
          ]}
        />{" "}
        <hr />
        <UserDetailsInfoSection
          title="Guarantor"
          items={[
            { label: "Full Name", value: user.guarantor?.fullName },
            { label: "Phone Number", value: user.guarantor?.phone },
            { label: "Email Address", value: user.guarantor?.email },
            { label: "Relationship", value: user.guarantor?.relationship },
          ]}
        />
      </div>
    </div>
  );
};

export default UserDetails;
