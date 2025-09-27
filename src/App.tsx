
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
// import UserDetailsPage from "./pages/UserDetailsPage"; // optional for /users/:id
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";
import UserDetails from "./pages/UserDetailsPage";

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

          {/* Protected dashboard with nested routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UserPage />} />
            <Route path="users/:id" element={<UserDetails />} />
          </Route>

          {/* Catch-all redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
