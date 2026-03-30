
import { useState } from "react";
import API from "../../api/axios";

import GSTBreakdown from "../../components/reports/GSTBreakdown";

import "../../styles/reports.css";

const GSTSummaryReport = () => {

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [gst, setGST] = useState(null);

  const [loading, setLoading] = useState(false);

  const loadGST = async () => {

    if (!month || !year) {
      alert("Select month and year");
      return;
    }

    try {

      const res = await API.get(
        `/invoices/reports/monthly?month=${month}&year=${year}`
      );

      setGST(res.data.gstBreakdown);

    }
    catch {

      alert("Failed to load GST report");

    }

  };

//   return (

//     <div className="container">

//       <h2>GST Summary Report</h2>

//       <div className="filters">

//         <input
//           type="number"
//           placeholder="Month (1-12)"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Year (2026)"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         />

//         <button
//           className="btn btn-primary"
//           onClick={loadGST}
//         >
//           Load GST
//         </button>

//       </div>

//       {gst && (

//         <GSTBreakdown gst={gst} />

//       )}

//     </div>

//   );

// };

return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">GST Summary Report</h2>
        {/* <p className="text-sm text-slate-500 font-medium italic">Official tax breakdown for compliance and filing</p> */}
      </div>

      {/* Filters Section - Modernized */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-end gap-4">
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">Month (1-12)</label>
          <input
            type="number"
            min="1"
            max="12"
            placeholder=""
            className="h-[46px] p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 transition-all"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1 tracking-widest">Year</label>
          <input
            type="number"
            placeholder=""
            className="h-[46px] p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 transition-all"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button
          className="h-[46px] bg-slate-800 text-white px-10 rounded-xl font-bold hover:bg-black shadow-lg transition-all active:scale-95 disabled:opacity-50"
          onClick={loadGST}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate GST Report"}
        </button>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {gst ? (
          <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-xl">
             <GSTBreakdown gst={gst} />
          </div>
        ) : !loading && (
          <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-slate-400">
            {/* <span className="text-4xl mb-2">📜</span> */}
            <p className="text-sm font-medium">Enter period to see tax breakdown</p>
          </div>
        )}

        {loading && (
           <div className="h-48 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
           </div>
        )}
      </div>
    </div>
  );
};

export default GSTSummaryReport;