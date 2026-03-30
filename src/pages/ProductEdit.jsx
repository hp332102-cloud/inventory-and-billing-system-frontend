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
    <div style={{ padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Update Stock for Product ID: <span style={{color: '#666'}}>{id}</span></h2>
      
      <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Enter new stock"
          value={newStock} // 3. Value bind karna zaroori hai
          onChange={(e) => setNewStock(e.target.value)} // 4. Type karte hi state update hogi
          style={{ 
            padding: "12px", 
            fontSize: "16px", 
            borderRadius: "6px", 
            border: "1px solid #ccc",
            width: "250px"
          }}
        />
        
        <button 
          type="submit"
          disabled={isUpdating} // Update hote waqt button disable ho jayega
          style={{ 
            padding: "12px 24px", 
            fontSize: "16px", 
            cursor: isUpdating ? "not-allowed" : "pointer", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "6px",
            transition: '0.3s'
          }}
        >
          {isUpdating ? "Updating..." : "Update & Back"}
        </button>
      </form>

      <button 
        onClick={() => navigate("/dashboard")} 
        style={{ marginTop: '20px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default ProductEdit;