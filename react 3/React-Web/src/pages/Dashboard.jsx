import React from "react";

const Dashboard = ({ user, onLogout }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome, {user?.email || "User"}!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
