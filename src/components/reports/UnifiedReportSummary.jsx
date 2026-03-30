import React from 'react';

const UnifiedReportSummary = ({ summary, gst }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        
        <div className="flex flex-col p-3 bg-blue-50/50 rounded-xl border border-blue-100">
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Invoices</span>
          <span className="text-xl font-bold text-blue-900">{summary?.totalInvoices || 0}</span>
        </div>

        <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Taxable Amount</span>
          <span className="text-xl font-bold text-slate-800">₹{Number(summary?.totalTaxableAmount || 0).toFixed(2)}</span>
        </div>

        <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CGST</span>
          <span className="text-xl font-bold text-slate-800">₹{Number(gst?.cgst || 0).toFixed(2)}</span>
        </div>

        <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SGST</span>
          <span className="text-xl font-bold text-slate-800">₹{Number(gst?.sgst || 0).toFixed(2)}</span>
        </div>

        <div className="flex flex-col p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">IGST</span>
          <span className="text-xl font-bold text-slate-800">₹{Number(gst?.igst || 0).toFixed(2)}</span>
        </div>

        <div className="flex flex-col p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Total GST</span>
          <span className="text-xl font-bold text-indigo-900">₹{Number(summary?.totalGST || 0).toFixed(2)}</span>
        </div>

        <div className="flex flex-col p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Grand Total</span>
          <span className="text-xl font-bold text-emerald-900">₹{Number(summary?.grandTotal || 0).toFixed(2)}</span>
        </div>

      </div>
    </div>
  );
};

export default UnifiedReportSummary;
