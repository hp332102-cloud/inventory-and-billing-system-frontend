import { useState, useEffect } from "react";
import API from "../../api/axios";

import ReportCard from "../../components/reports/ReportCard";

import "../../styles/reports.css";

const ReportsDashboard = () => {

  const [data, setData] = useState({
    todaySales: 0,
    monthlySales: 0,
    monthlyGST: 0,
    totalInvoices: 0
  });

  const loadDashboard = async () => {

    try {

      const res = await API.get(
        "/invoices/reports/dashboard"
      );

      setData(res.data);

    }
    catch {

      console.log("Dashboard load failed");

    }

  };

  useEffect(() => {

    loadDashboard();

  }, []);


  return (

    <div className="container">

      <h2>Reports Dashboard</h2>

      <div className="summary-grid">

        <ReportCard
          title="Today Sales"
          value={data.todaySales}
        />

        <ReportCard
          title="Monthly Sales"
          value={data.monthlySales}
        />

        <ReportCard
          title="Monthly GST"
          value={data.monthlyGST}
        />

        <ReportCard
          title="Total Invoices"
          value={data.totalInvoices}
        />

      </div>

    </div>

  );

};

export default ReportsDashboard;