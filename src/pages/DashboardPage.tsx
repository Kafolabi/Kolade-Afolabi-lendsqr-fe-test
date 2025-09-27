// import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import "../styles/pages/_dashboardPage.scss";
import { Outlet } from "react-router-dom";

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
        <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;


