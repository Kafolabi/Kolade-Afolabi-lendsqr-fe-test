// // import { BrowserRouter, Routes } from "react-router-dom";
// // import LoginPage from "./pages/LoginPage";
// import Sidebar from "./components/layout/Sidebar";
// import Navbar from "./components/layout/Navbar";
// import DashboardLayout from "./pages/DashboardPage";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// function App() {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         refetchOnWindowFocus: false,
//         staleTime: 5 * 60 * 1000,
//       },
//     },
//   });

//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         {/* <BrowserRouter> */}
//         {/* <Navbar /> */}

//         {/* <Sidebar /> */}
//         <DashboardLayout />
//         {/* // <Routes> */}
//         {/* <LoginPage /> */}
//         {/* </Routes> */}
//         {/* </BrowserRouter> */}
//       </QueryClientProvider>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public login route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
