// src/pages/layout/ProtectedRoute.jsx

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
// We will select directly from the 'auth' slice, not 'userSlice'
// import { selectUser } from "../../redux/features/userSlice"; 

// A simple loading component, as inspired by your demo
const LoadingScreen = () => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "24px",
    fontFamily: "sans-serif"
  }}>
    Loading...
  </div>
);

export default function ProtectedRoute({ children }) {
  // 1. Select BOTH isAuthenticated and user from the auth slice
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // 2. (THE FIX) Handle the loading state:
  // If the user has a token (isAuthenticated) but we are still
  // fetching the user object (!user), show a loading screen.
  if (isAuthenticated && !user) {
    return <LoadingScreen />;
  }

  // 3. Handle the success state:
  // If we have a token AND the user object, show the page.
  if (isAuthenticated && user) {
    return children;
  }

  // 4. Handle the logged-out state:
  // If we have no token, redirect to signin.
  return <Navigate to="/signin" state={{ from: location }} replace />;
}