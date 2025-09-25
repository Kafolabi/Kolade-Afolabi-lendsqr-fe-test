// import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../styles/layouts/_dashboardLayout.scss";

function Layout() {
  return (
    <div className="layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Body: Sidebar + Content */}
      <div className="layout__body">
        <Sidebar />
        {/* <main className="layout__content"> */}
          {/* <Outlet /> */}
        {/* </main> */}
      </div>
    </div>
  );
}

export default Layout;
