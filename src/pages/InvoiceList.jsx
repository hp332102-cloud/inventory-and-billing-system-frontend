import { useEffect, useState, useCallback, useRef } from "react";
import API from "../api/axios";

const InvoiceList = () => {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const isInitialLoad = useRef(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInvoices, setTotalInvoices] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");



  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Jab bhi search badle, page 1 par le jao
    }, 500); // 500ms ka wait

    return () => clearTimeout(handler); // Agar user firse type kare toh pichla timer clear ho jaye
  }, [searchTerm]);

  // =========================
  // FETCH INVOICES
  // =========================


  const fetchInvoices = useCallback(async (currentPage, search, currentSortBy, currentOrder) => {
    try {
      // First load pe full spinner, baad mein sirf search spinner
      if (isInitialLoad.current) {
        setLoading(true);
      } else {
        setSearchLoading(true);
      }
    
      const url = `/invoices?page=${currentPage}&limit=5&search=${encodeURIComponent(search)}&sortBy=${currentSortBy}&order=${currentOrder}`;
    
      const res = await API.get(url);

      if (res.data && Array.isArray(res.data.data)) {
        setInvoices(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setTotalInvoices(res.data.totalInvoices || 0);
      } else {
        setInvoices([]);
        setTotalPages(1);
        setTotalInvoices(0);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setInvoices([]);
    } finally {
      setLoading(false);
      setSearchLoading(false);
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    fetchInvoices(page, debouncedSearch, sortBy, order);
  }, [page, debouncedSearch, sortBy, order, fetchInvoices]);

  /*const fetchInvoices = async (currentPage = 1) => {

    try {

      setLoading(true);

      const res = await API.get(`/invoices?page=${currentPage}&limit=5`);

      console.log("API RESPONSE:", res.data);

      if (Array.isArray(res.data.data)) {

        setInvoices(res.data.data);
        setTotalPages(res.data.totalPages || 1);

      } else {

        setInvoices([]);
        setTotalPages(1);

      }

    }
    catch (err) {

      console.log(err);
      setInvoices([]);

    }
    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchInvoices(page);

  }, [page]);*/


  // =========================
  // DOWNLOAD PDF
  // =========================

  /*const downloadPDF = (id) => {

    window.open(
      `http://localhost:5000/api/invoices/${id}/pdf`,
      "_blank"
    );

  };*/
    //auth use kare etle token nai male so apde window.open valu nai karie !!!
  /*const downloadPDF = async (id) => {

  try {

    const res = await API.get(
      `/invoices/invoice/${id}/pdf`,
      {
        responseType: "blob" // important for PDF
      }
    );

    // create file URL
    const url = window.URL.createObjectURL(
      new Blob([res.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      `invoice_${id}.pdf`
    );

    document.body.appendChild(link);

    link.click();

  }
  catch (error) {

    console.log(error);

    alert("Error downloading PDF");

  }

};*/

// =========================
  // DOWNLOAD PDF (Updated)
  // =========================
  const downloadPDF = async (id) => {
    try {
      // 1. API Call - ⚠️ 'responseType: blob' ko HATA DIYA hai
      const res = await API.get(`/invoices/invoice/${id}/pdf`);

      // 2. Check karein agar backend se URL aaya hai
      if (res.data.success && res.data.url) {
        const pdfUrl = res.data.url;
        const fileName = res.data.fileName || `invoice_${id}.pdf`;

        // 3. ✅ Sahi Tarika: Link banakar click karwana
        const link = document.createElement("a");
        link.href = pdfUrl;
        
        // Isse browser ko pata chalega ki ye file download karni hai
        link.setAttribute("download", fileName);
        
        // Security aur navigation ke liye
        link.setAttribute("target", "_blank"); 
        
        document.body.appendChild(link);
        link.click();

        // 4. Cleanup
        document.body.removeChild(link);
      } else {
        alert("PDF link nahi mil payi!");
      }
    } catch (error) {
      console.log("Download Error:", error);
      alert("Error downloading PDF. Console check karein.");
    }
  };


  // =========================
  // CANCEL INVOICE
  // =========================

  const cancelInvoice = async (id) => {

    try {

      if (!window.confirm("Cancel this invoice?")) return;

      await API.patch(`/invoices/${id}/cancel`);

      alert("Invoice cancelled");

      fetchInvoices(page, debouncedSearch, sortBy, order);

    }
    catch (err) {

      console.log(err);
      alert("Cancel failed");

    }

  };


  // =========================
  // STATUS BADGE
  // =========================

  const getStatusStyle = (status) => {

    return {

      padding: "5px 10px",
      borderRadius: "5px",
      color: "white",
      fontWeight: "bold",
      backgroundColor:
        status === "Active"
          ? "#28a745"
          : "#dc3545"

    };

  };


  // =========================
  // LOADING
  // =========================

//   if (loading)
//     return <h3 style={{ padding: "20px" }}>Loading invoices...</h3>;


//   return (

//     <div style={{ padding: "20px" }}>

//       <h2>Invoice List</h2>

//       {
//         invoices.length === 0 ? (

//           <h3>No invoices found</h3>

//         ) : (

//           <>

//             {/* TABLE */}

//             <table
//               border="1"
//               cellPadding="10"
//               cellSpacing="0"
//               width="100%"
//               style={{
//                 borderCollapse: "collapse",
//                 marginTop: "10px"
//               }}
//             >

//               <thead style={{ backgroundColor: "#f2f2f2" }}>

//                 <tr>

//                   <th>Invoice No</th>
//                   <th>Customer</th>
//                   <th>Email</th>
//                   <th>Total</th>
//                   <th>Status</th>
//                   <th>PDF</th>
//                   <th>Cancel</th>

//                 </tr>

//               </thead>


//               <tbody>

//                 {
//                   invoices.map(invoice => (

//                     <tr key={invoice._id}>

//                       <td>{invoice.invoiceNumber}</td>

//                       <td>{invoice.customerName}</td>

//                       <td>{invoice.customerEmail}</td>

//                       <td>
//                         ₹{invoice.totalAmount?.toFixed(2)}
//                       </td>

//                       <td>

//                         <span style={getStatusStyle(invoice.status)}>
//                           {invoice.status}
//                         </span>

//                       </td>

//                       <td>

//                         <button
//                           onClick={() =>
//                             downloadPDF(invoice._id)
//                           }
//                           style={{
//                             backgroundColor: "#007bff",
//                             color: "white",
//                             border: "none",
//                             padding: "5px 10px",
//                             cursor: "pointer"
//                           }}
//                         >
//                           Download
//                         </button>

//                       </td>

//                       <td>

//                         {
//                           invoice.status === "Active" && (

//                             <button
//                               onClick={() =>
//                                 cancelInvoice(invoice._id)
//                               }
//                               style={{
//                                 backgroundColor: "#dc3545",
//                                 color: "white",
//                                 border: "none",
//                                 padding: "5px 10px",
//                                 cursor: "pointer"
//                               }}
//                             >
//                               Cancel
//                             </button>

//                           )
//                         }

//                       </td>

//                     </tr>

//                   ))
//                 }

//               </tbody>

//             </table>


//             {/* PAGINATION */}

//             <div style={{ marginTop: "20px" }}>

//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//               >
//                 Previous
//               </button>


//               <span style={{ margin: "0 10px" }}>
//                 Page {page} of {totalPages}
//               </span>


//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//               >
//                 Next
//               </button>

//             </div>

//           </>

//         )
//       }

//     </div>

//   );

// };


if (loading) return (
    <div className="flex justify-center items-center h-64">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );


  return (
    <div className="w-full space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Invoice History</h2>
          <p className="text-slate-500 text-xs md:text-sm">View and manage your generated GST invoices</p>
        </div>
        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest border border-blue-100 whitespace-nowrap">
          Total Invoices: {totalInvoices}
        </div>
      </div>

      <div className="mb-4 relative w-full sm:w-1/2 lg:w-1/3">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by Invoice #, Name or Email..."
          className="w-full p-2.5 border rounded-xl shadow-sm pr-10 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchLoading && (
          <div className="absolute top-3 right-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
        {!searchLoading && searchTerm && (
          <button
            onClick={() => { setSearchTerm(""); setDebouncedSearch(""); setPage(1); }}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Main List Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden w-full">
        {invoices.length === 0 ? (
          <div className="p-20 text-center">
            <h3 className="text-slate-400 font-medium italic text-lg whitespace-nowrap">No invoices found in the system</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-4">Inv No.</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4 text-right">Bill Discount</th>
                  <th className="p-4">Email Address</th>
                  <th 
                    className="cursor-pointer hover:bg-gray-100 p-2" 
                    onClick={() => {
                      const newOrder = order === "asc" ? "desc" : "asc";
                      setSortBy("totalAmount"); // ✨ Amount wise sort
                      setOrder(newOrder);
                    }}
                  >
                    Total Amount {sortBy === "totalAmount" ? (order === "asc" ? "🔼" : "🔽") : ""}
                  </th>
                  
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 font-mono font-bold text-blue-600">#{invoice.invoiceNumber}</td>
                    <td className="p-4 text-slate-700 font-semibold">{invoice.customerName}</td>
                    <td className="p-4 text-right text-red-500 font-medium">
                      {invoice.billDiscount > 0 ? `-RS${invoice.billDiscount.toFixed(2)}` : "-"}
                    </td>
                    <td className="p-4 text-slate-500 text-sm">{invoice.customerEmail}</td>
                    <td className="p-4 text-right font-bold text-slate-800">₹{invoice.totalAmount?.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        invoice.status === "Active" 
                        ? "bg-green-100 text-green-600 border border-green-200" 
                        : "bg-red-100 text-red-600 border border-red-200"
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2 whitespace-nowrap">
                      <button 
                        onClick={() => downloadPDF(invoice._id)}
                        className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-black transition-all shadow-sm"
                      >
                        PDF
                      </button>
                      {invoice.status === "Active" && (
                        <button 
                          onClick={() => cancelInvoice(invoice._id)}
                          className="bg-white text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. Modern Pagination Section
      <div className="flex items-center justify-between px-2 pb-10">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-1 text-sm font-bold text-slate-400 disabled:opacity-30 hover:text-blue-600 transition-colors"
        >
           Previous
        </button>
        <div className="flex items-center gap-2">
           <span className="text-xs font-black text-slate-300 tracking-widest uppercase">Page</span>
           <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-sm font-bold text-blue-600 shadow-sm">{page}</span>
           <span className="text-xs font-black text-slate-300 tracking-widest uppercase">of {totalPages}</span>
        </div>
        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 disabled:opacity-30 hover:text-blue-800 transition-colors"
        >
          Next 
        </button>
      </div> */}
      {/* Modern Pagination Section */}
      <div className="flex items-center justify-between w-full px-4 py-8 mt-4 border-t border-slate-100">
  
        {/* Previous Button */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`text-sm font-bold tracking-wide transition-all ${
            page === 1 
            ? "text-slate-300 cursor-not-allowed" 
            : "text-slate-400 hover:text-blue-600"
          }`}
        >
          Previous
        </button>

        {/* Page Indicator */}
        <div className="text-sm font-bold text-slate-400 tracking-wide">
          Page {page} of {totalPages}
        </div>

        {/* Next Button */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`text-sm font-bold tracking-wide transition-all ${
            page === totalPages 
            ? "text-slate-300 cursor-not-allowed" 
            : "text-blue-600 hover:text-blue-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceList;