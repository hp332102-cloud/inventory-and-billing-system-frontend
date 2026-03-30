
import { useState } from "react";
import API from "../../api/axios";

import InvoiceList from "../../components/reports/InvoiceList";
import NoDataFound from "../../components/reports/NoDataFound";

import "../../styles/reports.css";

const DailySalesReport = () => {

  const [date, setDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalSales,setTotalSales] = useState(0);//summary k liye


const loadReport = async () => {
  if (!date) {
    alert("Please select date");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const res = await API.get(`/invoices/daily-report?date=${date}`);

    console.log("API RESPONSE:", res.data);

    // 1. Data extract karein
    const invoiceData = res?.data?.data || res?.data?.invoices || [];
    
    // 2. Yahan 'total' ko define karein (Jo aapke API response mein 'totalSales' naam se hai)
    const total = res?.data?.totalSales || 0; 

    setInvoices(Array.isArray(invoiceData) ? invoiceData : []);
    
    // 3. Ab ye 'total' variable work karega
    setTotalSales(total); 
    
    setSearched(true);

  } catch (err) {
    console.log(err);
    setError("Something went wrong while loading report");
    setInvoices([]);
    setSearched(true);
  } finally {
    setLoading(false);
  }
};
//   return (
//     <div className="container">

//       <h2>Daily Sales Report</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <button
//           className="btn btn-primary"
//           onClick={loadReport}
//           style={{ marginLeft: "10px" }}
//         >
//           Load Report
//         </button>
//       </div>

//       {/* Loading */}
//       {loading && <p>Loading report...</p>}

//       {/* Error */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Show Table */}
//       {!loading && invoices.length > 0 && (
//         <InvoiceList invoices={invoices} />
//       )}

//       {/* Show No Data */}
//       {!loading && searched && invoices.length === 0 && (
//         <NoDataFound />
//       )}

//     </div>
//   );


  return (
    <div className="w-full space-y-6">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Daily Sales Report</h2>
          {/* <p className="text-sm text-slate-500">Analyze your daily performance and GST collection</p> */}
        </div>
        {searched && !loading && (
           <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total Sales</p>
              <p className="text-xl font-black text-blue-600">₹{totalSales.toFixed(2)}</p>
           </div>
        )}
      </div>

      {/* 2. Filter Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-end gap-4">
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">Select Date</label>
          <input
            type="date"
            className="h-[46px] p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={loadReport}
          className="h-[46px] bg-blue-600 text-white px-8 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Report"}
        </button>
      </div>

      {/* 3. Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-4">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium">Fetching Data...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 font-bold">{error}</p>
            <button onClick={loadReport} className="text-blue-600 underline text-sm">Try again</button>
          </div>
        ) : invoices.length > 0 ? (
          <div className="w-full">
            <InvoiceList invoices={invoices} />
          </div>
        ) : searched ? (
          <NoDataFound />
        ) : (
          <div className="text-center space-y-2 text-slate-400">
             {/* <span className="text-4xl">📅</span> */}
             <p className="font-medium text-sm">Please select a date to view sales activity.</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default DailySalesReport;