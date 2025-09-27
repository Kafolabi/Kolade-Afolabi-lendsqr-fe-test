import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "../styles/pages/_userDetailsPage.scss";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useUser(id!);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading user...</p>;
  if (isError || !user) return <p>User not found</p>;

  return (
    <div className="user-details">
      {/* Header */}
      <div className="user-header">
        <button onClick={() => navigate(-1)}>← Back to Users</button>
        <h2>User Details</h2>
        <div className="actions">
          <button className="btn-outline-red">Blacklist User</button>
          <button className="btn-outline-green">Activate User</button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar">{user.fullName.charAt(0)}</div>
        <div>
          <h3>{user.fullName}</h3>
          <p>{user.id}</p>
        </div>
        <div>
          <h3>₦{user.savings ?? "0.00"}</h3>
          <p>{user.organization}</p>
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

      {/* General Details Content */}
      <div className="general-details">
        <section>
          <h4>Personal Information</h4>
          <p>
            <strong>Full Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Status:</strong> {user.status}
          </p>
        </section>

        <section>
          <h4>Education and Employment</h4>
          <p>
            <strong>Organization:</strong> {user.organization}
          </p>
          <p>
            <strong>Loan Repayment:</strong> {user.loanRepayment}
          </p>
          <p>
            <strong>Savings:</strong> {user.savings}
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
