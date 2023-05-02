/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getDashboardData } from '../../api/api'

function Dashboard() {
  const [dashBoard, setDashBoard] = useState([]);
  async function fetchDashboard() {
    try {
      const { data } = await getDashboardData();
      setDashBoard(data);
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      hello dashboard
    </div>
  );
}

export default Dashboard;
