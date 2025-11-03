import { Link } from "react-router";

export default function DashboardPage() {
  return (
    <div>
      dashboard page
      <Link to="/login">Go to Login</Link>
    </div>
  );
}
