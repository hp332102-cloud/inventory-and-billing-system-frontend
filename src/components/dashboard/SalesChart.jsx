import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Sales Report" },
    },
  };

  const chartData = {
    labels: data && data.length > 0 ? data.map(item => item._id) : ["No Data"],
    datasets: [
      {
        label: "Total Sales (₹)",
        data: data && data.length > 0 ? data.map(item => item.total) : [0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
};

export default SalesChart;