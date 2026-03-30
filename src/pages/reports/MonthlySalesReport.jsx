
import { useState } from "react";
import API from "../../api/axios";

import ReportFilters from "../../components/reports/ReportFilters";
import ReportSummary from "../../components/reports/ReportSummary";
import GSTBreakdown from "../../components/reports/GSTBreakdown";
import InvoiceList from "../../components/reports/InvoiceList";
import DownloadButton from "../../components/reports/DownloadButton";

import "../../styles/reports.css";

const MonthlySalesReport = () => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [report, setReport] = useState(null);
  
  const[loading,setLoading] = useState(false);

  const loadReport = async () => {
    try{
      if(!startDate || !endDate) {
        alert("Please select start and end dates");
        return;
      }
      console.log("Calling API...");
      setLoading(true);
      const res = await API.get(
      `/invoices/reports/monthly?startDate=${startDate}&endDate=${endDate}`);

      console.log("Response:",res.data);
      setReport(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("API ERROR:",error.response?.data || error.message);
      alert("Failed to load report");
    }
  };
  

  const downloadPDF = async () => {
    const res = await API.get(
      `/invoices/reports/monthly/pdf?startDate=${startDate}&endDate=${endDate}`
    );
    window.open(
      `http://localhost:5000${res.data.file}`
    );
  };


//   return (

//     <div className="container">

//       <h2>Monthly Sales & GST Report</h2>

//       <ReportFilters
//         month={month}
//         year={year}
//         setMonth={setMonth}
//         setYear={setYear}
//         onSearch={loadReport}
//       />

//       <DownloadButton onDownload={downloadPDF} />

//       {report && (

//         <>

//           <ReportSummary summary={report.summary} />

//           <GSTBreakdown gst={report.gstBreakdown} />

//           <InvoiceList invoices={report.invoices} />

//         </>

//       )}

//     </div>

//   );

// };


return (
    <div className="w-full space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Sales & GST Report</h2>
          {/* <p className="text-sm text-slate-500 font-medium">Monthly performance overview and tax breakdown</p> */}
        </div>
        
        {report && (
          <button
            onClick={downloadPDF}
            className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg active:scale-95"
          >
            <span>📥</span> Download PDF Report
          </button>
        )}
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-end gap-4">
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">Start Date</label>
          <input
            type="date"
            className="h-[46px] p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 transition-all w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">End Date</label>
          <input
            type="date"
            className="h-[46px] p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 transition-all w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold">Generating Monthly Report...</p>
        </div>
      ) : report ? (
        <div className="space-y-6 animate-in fade-in duration-500">
          
          {/* Summary & GST Breakdown Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportSummary 
              summary={{
                ...report.summary,
                totalTaxableAmount: Number(report.summary.totalTaxableAmount || 0).toFixed(2),
                totalDiscount: Number(report.summary.totalDiscount || 0).toFixed(2),
                totalGST: Number(report.summary.totalGST || 0).toFixed(2),
                grandTotal: Number(report.summary.grandTotal || 0).toFixed(2)
              }} 
            />
  
            <GSTBreakdown 
              gst={{
                cgst: Number(report.gstBreakdown.cgst || 0).toFixed(2),
                sgst: Number(report.gstBreakdown.sgst || 0).toFixed(2),
                igst: Number(report.gstBreakdown.igst || 0).toFixed(2)
              }} 
            />
          </div>


          {/* Detailed Invoice List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-50">
              <h3 className="font-bold text-slate-700">Detailed Transaction History</h3>
            </div>
            <InvoiceList invoices={report.invoices} />
          </div>
          
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-slate-300 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          {/* <span className="text-5xl mb-2">📊</span> */}
          <p className="font-medium">Select a period to generate the report</p>
        </div>
      )}
    </div>
  );
};
export default MonthlySalesReport;