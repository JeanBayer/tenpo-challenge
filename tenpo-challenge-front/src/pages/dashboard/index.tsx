import privateApi from "@/shared/api/axios";
import { useEffect } from "react";
import { Link } from "react-router";

export default function DashboardPage() {
  async function fetchData() {
    try {
      const { data } = await privateApi.get("/pokemon");
      console.log("Protected data:", data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      dashboard page
      <Link to="/login">Go to Login</Link>
      <button onClick={fetchData}>Fetch Protected Data</button>
    </div>
  );
}
