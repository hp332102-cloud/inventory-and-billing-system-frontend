/*import { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';


const ProductEdit = () => {
  const { id } = useParams(); // URL se ID nikalne ke liye
  const navigate = useNavigate();
  const [newStock, setNewStock] = useState("");

  const handleUpdate = async () =>{
    try{
        //Backend ko patch/put request bhejna
        const res = await API.put(`/products/${id}`, { stock: Number(newStock) });
        if(res.data.success){
            alert("Stock updated successfully!");
            navigate("/dashboard");//wapas dashboard par bhej dega
        }
    } catch (err) {
        console.error("Update error:",err);
        alert("Failed to update stock");
    }
  };

  return (
    <div style={{ padding: '20px' ,textAlign: "center"}}>
      <h2>Update Stock for Product ID: {id}</h2>
      <div style={{ marginTop: "20px"}}>
        <input
         type="number"
         placeholder="Enter new stock"
         value={newStock}
         onClick={(e) =>setNewStock(e.target.value)}//value update karne k liye
         style={{ padding: "10px",marginRight: "10px",borderRadius: "5px", border: "1px solid #ccc"}}/>
        <button
         onClick={handleUpdate}
         style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none",borderRadius: "5px"}}>
            Update & Back
            </button> 
      </div>*/
//       {/* Yahan aapka form aayega stock update karne ke liye */}
//       <input type="number" placeholder="Enter new stock" />
//       <button onClick={() => navigate('/dashboard')}>Update & Back</button>
//     </div>
//   );
// };

// export default ProductEdit;




import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios"; 

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. State for input and loading
  const [newStock, setNewStock] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // 2. Handle the update action
  const handleUpdate = async (e) => {
    e.preventDefault(); // Page refresh rokne ke liye
    
    if (!newStock || newStock < 0) {
      alert("Please enter a valid stock number!");
      return;
    }

    try {
      setIsUpdating(true);
      // Backend route check karein: /api/products/:id
      const res = await API.put(`/products/${id}`, { stock: Number(newStock) });
      
      if (res.data.success) {
        alert("Stock updated successfully! ✅");
        navigate("/dashboard"); // Success hone par wapas dashboard
      }
    } catch (err) {
      console.error("Update error details:", err.response || err);
      alert("Failed to update stock. Check console for details.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-10 space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6">
          Update Stock for Product ID: <span className="text-slate-400 font-mono text-sm sm:text-base">{id}</span>
        </h2>
        
        <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">New Stock Quantity</label>
            <input
              type="number"
              placeholder="Enter new stock"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              autoFocus
            />
          </div>
          
          <button 
            type="submit"
            disabled={isUpdating}
            className={`sm:mt-5 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              isUpdating ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {isUpdating ? "Updating..." : "Update Stock"}
          </button>
        </form>

        <div className="mt-8 border-t pt-6">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;