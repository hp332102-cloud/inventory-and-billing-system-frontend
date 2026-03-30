// const GSTBreakdown = ({ gst }) => {

//   return (

//     <div className="report-card">

//       <h3>GST Breakdown</h3>

//       <p>CGST: ₹{gst.cgst}</p>

//       <p>SGST: ₹{gst.sgst}</p>

//       <p>IGST: ₹{gst.igst}</p>

//     </div>

//   );

// };

// export default GSTBreakdown;


const GSTBreakdown = ({ gst }) => {
  return (
    <div className="report-card">
      <h3>GST Breakdown</h3>

      {/* Number().toFixed(2) se decimal fix ho jayega */}
      <p>CGST: ₹{Number(gst?.cgst || 0).toFixed(2)}</p>

      <p>SGST: ₹{Number(gst?.sgst || 0).toFixed(2)}</p>

      <p>IGST: ₹{Number(gst?.igst || 0).toFixed(2)}</p>
    </div>
  );
};

export default GSTBreakdown;



/*const GSTBreakdown = ({ gst }) => {
  if (!gst) return <p className="text-slate-400 italic">No GST data</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        <span className="text-slate-600 font-medium">CGST (9%)</span>
        <span className="font-bold text-slate-800">₹{gst.cgst?.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        <span className="text-slate-600 font-medium">SGST (9%)</span>
        <span className="font-bold text-slate-800">₹{gst.sgst?.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
        <span className="text-slate-600 font-medium">IGST</span>
        <span className="font-bold text-slate-800">₹{gst.igst?.toLocaleString()}</span>
      </div>
      <div className="pt-2 border-t border-dashed border-slate-200 flex justify-between items-center">
        <span className="font-bold text-blue-600">Total GST</span>
        <span className="font-black text-blue-600 text-lg">₹{(gst.cgst + gst.sgst + gst.igst)?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default GSTBreakdown;*/