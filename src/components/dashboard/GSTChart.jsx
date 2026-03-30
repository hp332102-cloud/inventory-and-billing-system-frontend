import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GSTChart = ({ data }) => {
  if (!data || (data.totalCGST === 0 && data.totalSGST === 0 && data.totalIGST === 0)) {
    return <div style={{ textAlign: "center", padding: "20px" }}>No GST Data Available</div>;
  }

  const chartData = {
    labels: ["CGST", "SGST", "IGST"],
    datasets: [
      {
        label: "GST Amount (₹)",
        data: [data.totalCGST, data.totalSGST, data.totalIGST],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "bottom", 
      },
    },
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "350px", 
      width: "100%" 
    }}>
      <h4 style={{ marginBottom: "15px" }}>GST Distribution</h4>
      
      <div style={{ width: "250px", height: "250px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GSTChart;