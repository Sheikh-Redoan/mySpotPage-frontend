import { Link } from "react-router";

export default function ForbiddenPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Access Denied</h1>
      <p>You do not have the necessary permissions to view this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
