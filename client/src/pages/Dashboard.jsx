import { useAuthContext } from "@/context/AuthContext";
import React from "react";

const Dashboard = () => {
  const { logout } = useAuthContext();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>Hello</h1>
    </div>
  );
};

export default Dashboard;
