// import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UserPage from "./UserPage";
import "../styles/pages/_dashboardPage.scss";
import { useAuth } from "../hooks/useAuth";

function DashboardPage() {
    // const { isAuthenticated } = useAuth();

  return (
    <div className="layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Body: Sidebar + Content */}
      <div className="layout__body">
        <Sidebar />
        <main className="layout__content">
        <UserPage />

        {/* <Outlet /> */}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;


