// const ReportSummary = ({ summary }) => {

//   return (

//     <div className="summary-grid">

//       <div className="summary-box">
//         Total Invoices
//         <h3>{summary.totalInvoices}</h3>
//       </div>

//       <div className="summary-box">
//         Taxable Amount
//         <h3>₹{summary.totalTaxableAmount}</h3>
//       </div>

//       <div className="summary-box">
//         Total GST
//         <h3>₹{summary.totalGST}</h3>
//       </div>

//       <div className="summary-box">
//         Grand Total
//         <h3>₹{summary.grandTotal}</h3>
//       </div>

//     </div>

//   );

// };

// export default ReportSummary;




const ReportSummary = ({ summary }) => {
  return (
    <div className="summary-grid">
      <div className="summary-box">
        Total Invoices
        <h3>{summary?.totalInvoices || 0}</h3>
      </div>

      <div className="summary-box">
        Taxable Amount
        {/* variable name: totalTaxable (Small 't') */}
        <h3>₹{Number(summary?.totalTaxableAmount || 0).toFixed(2)}</h3>
      </div>

      <div className="summary-box">
        Total Discount
        <h3>₹{Number(summary?.totalDiscount || 0).toFixed(2)}</h3>
      </div>

      <div className="summary-box">
        Total GST
        {/* variable name: totalGst (Small 'gst') */}
        <h3>₹{Number(summary?.totalGST || 0).toFixed(2)}</h3>
      </div>

      <div className="summary-box">
        Grand Total
        <h3>₹{Number(summary?.grandTotal || 0).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ReportSummary;
