// React hooks import kar rahe hai  
import { useState, useEffect, useRef } from "react";  

import Modal from "../components/Model";
  
// API file import (axios instance)  
import API from "../api/axios";  
  
const Products = () => {  
  
  // products list store karne ke liye  
  
  const formRef = useRef(null);
  const [products, setProducts] = useState([]);  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  
  // form input ke liye state  
  const [name, setName] = useState("");  
  const [price, setPrice] = useState("");  
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [gstRate, setGstRate] = useState(18); // Default 18% GST
  const [editingId, setEditingId] = useState(null);

  const [hsnCode, setHsnCode] = useState("");

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountType, setDiscountType] = useState("percentage");

  

  const [page, setPage] = useState(1);
  //const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  
  // ===============================  
  // GET PRODUCTS FUNCTION  
  // ===============================  
  const getProducts = async () => {  
  
    try {  
  
      // backend se products fetch kar rahe hai  
      /*const res = await API.get("/products");  
      const data =res.data.products || res.data;
  
      // state me save kar rahe hai  
      setProducts(data);*/
      const res = await API.get(`/products?page=${page}&limit=${limit}&search=${searchTerm}`);

      console.log("FULL RESPONSE:",res.data);

      // backend format handle
      setProducts(res.data.products || []);
      setTotalPages(res.data.pagination.totalPages || 1);  
  
    } catch (error) {  
  
      console.log("Error fetching products",error);  
      //console.log(); 

    }  
  
  };  
  
  
  
  // ===============================  
  // ADD PRODUCT FUNCTION  
  // ===============================  
  /*const addProduct = async () => {  
  
    try {  
  
      // backend me product send kar rahe hai  
      await API.post("/products", {  
        name: name,  
        price: price, 
        category: category,
        stock: Number(stock) || 0,
        gstRate: Number(gstRate) || 0
      });  
  
      alert("Product added successfully");  
  
      // input clear  
      setName("");  
      setPrice("");  
      setCategory("");
      setStock("");
      setGstRate(18);
  
      // list refresh  
      getProducts();  
  
    } catch (error) {  
  
      alert("Error adding product");  
  
    }  
  
  };*/
  
  const addProduct = async () => {
    if (discountType === "percentage" && Number(discountPercentage) > 100) {
      alert("Discount percentage cannot exceed 100%");
      return;
    }
    if (discountType === "flat" && Number(discountPercentage) > Number(price)) {
      alert("Flat discount cannot exceed the product price");
      return;
    }
  try {
    // Ensure karein ki hum 'gstRate' state hi bhej rahe hain
    const payload = {
      name,
      hsnCode,
      price: Number(price), 
      category,
      stock: Number(stock) || 0,
      lowStockThreshold: Number(lowStockThreshold) || 10,
      gstRate: Number(gstRate), // <--- Yeh check karein ki 'gstRate' hi likha hai
      discountType,
      discountPercentage: Number(discountPercentage)
    };

    console.log("Adding Product with:", payload); // Debugging ke liye

    await API.post("/products", payload);

    alert("Product added successfully ✅");
    clearForm(); // Form reset function
    getProducts();

  } catch (error) {
    console.error("Error adding product:", error);
    alert(error.response?.data?.message || "Error adding product");
  }
};
  
  //DELETE

  const deleteProduct = async (id) => {

    if (!window.confirm("Are you sure to delete?")) return;

    try {

      await API.delete(`/products/${id}`);

      alert("Product deleted");

      getProducts();

    } catch {
      alert("Error deleting product");
    }

  };

  // ===============================
  // EDIT BUTTON CLICK
  // ===============================
  const editProduct = (product) => {

    setEditingId(product._id);

    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setLowStockThreshold(product.lowStockThreshold || 10);
    setGstRate(product.gstRate || 0);
    setDiscountPercentage(product.discountPercentage || 0);
    setDiscountType(product.discountType || "percentage");
    setHsnCode(product.hsnCode || "");
    formRef.current?.scrollIntoView({ behavior: "smooth"});

    setIsModalOpen(true);

  };

  // ===============================
  // UPDATE PRODUCT
  // ===============================
  const updateProduct = async () => {
    if (!name || !hsnCode || !price || !category) {
      alert("Name, HSN Code, Price, and Category are required!");
      return;
    }
    if (discountType === "percentage" && Number(discountPercentage) > 100) {
      alert("Discount percentage cannot exceed 100%");
      return;
    }
    if (discountType === "flat" && Number(discountPercentage) > Number(price)) {
      alert("Flat discount cannot exceed the product price");
      return;
    }

    try {
      await API.put(`/products/${editingId}`, {
        name,
        hsnCode,
        price: Number(price),
        category,
        stock: Number(stock),
        lowStockThreshold: Number(lowStockThreshold) || 10,
        gstRate: Number(gstRate),
        discountType,
        discountPercentage: Number(discountPercentage)
      });

      alert("Product updated successfully ✅");

      clearForm();
      getProducts();

    } catch {
      alert("Error updating product");
    }

  };
  // ===============================
  // CLEAR FORM
  // ===============================
  const clearForm = () => {

    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setLowStockThreshold(10);
    setGstRate(18);
    setEditingId(null);
    setDiscountPercentage(0);
    setDiscountType("percentage"); //reset to default
    setIsModalOpen(false);

  };
  
  
  
  // ===============================  
  // PAGE LOAD hone par run hoga  
  // ===============================  
  useEffect(() => {  
  
    getProducts();  
  
  }, [page,searchTerm]);  
  
  
  
  
  // ===============================  
  // UI PART  
  // ===============================  
//   return (  
  
//     <div style={{ padding: "20px" }}>  
  
//       <h2>Product Management</h2>  
  
  
//       {/* ADD PRODUCT FORM */}  
  
//       <input  
//         type="text"  
//         placeholder="Product name"  
//         value={name}  
//         onChange={(e) => setName(e.target.value)}  
//       />  
  
//       <br /><br />  
  
//       <input  
//         type="number"  
//         placeholder="Price"  
//         value={price}  
//         onChange={(e) => setPrice(e.target.value)}  
//       />  
  
//       <br /><br />
//       <input
//         type="text"
//         placeholder="Enter category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       /> 

//       <br /><br /> 
//       <input
//         type="number"
//         placeholder="Enter stock"
//         value={stock}
//         onChange={(e) => setStock(e.target.value)}
//       /> 

//       <br /><br /> 
  

//       {/* ADD / UPDATE BUTTON */}

//       {
//         editingId ? (

//           <>
//             <button onClick={updateProduct}>
//               Update Product
//             </button>

//             <button onClick={clearForm} style={{ marginLeft: "10px" }}>
//               Cancel
//             </button>
//           </>

//         ) : (

//           <button onClick={addProduct}>
//             Add Product
//           </button>

//         )
//       }
  
  
  
//       <hr />  
  
//       {/* PRODUCT LIST */}  
  
//       <h3>Product List</h3>  
  

//       <div 
//         style={{
//           display: "flex",
//           gap: "40px",
//           fontWeight: "bold",
//           padding: "10px",
//           borderBottom: "2px solid black"
//         }}
//       >
//         <span style={{ width: "200px" }}>Name</span>
//         <span style={{ width: "150px" }}>Price</span>
//         <span style={{ width: "100px" }}>Stock</span>
//       </div>
  
      
//       {  
  
//         /*products.map((product) => (  
  
//           <div key={product._id}>  
  
//             Name: {product.name}   <br /> 
//             Price: ₹{product.price}  <br />
//             Stock: {product.stock}
  
//           </div>  
  
//         ))*/
       
//         products.map((product) => (

//           <div 
//             key={product._id}
//             style={{
//               display: "flex",
//               gap: "40px",          // space between columns
//               padding: "10px",
//               borderBottom: "1px solid #ccc"
//             }}
//         >

//             <span style={{ width: "200px" }}>
//               Name: {product.name}
//             </span>

//             <span style={{ width: "150px" }}>
//               Price: ₹{product.price}
//             </span>

//             <span style={{ width: "100px" }}>
//               Stock: {product.stock}
//             </span>

//             {/* ACTION BUTTONS */}

//             <span>

//               <button onClick={() => editProduct(product)}>
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteProduct(product._id)}
//                 style={{ marginLeft: "10px", color: "red" }}
//               >
//                 Delete
//               </button>

//             </span>

//           </div>

//         ))
        
  

//       }  
//       <br />
//       {/* PAGINATION BUTTONS */}
//       <div style={{ marginTop: "20px" }}>

//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Previous
//         </button>

//         <span style={{ margin: "0 15px" }}>
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>

//       </div>
  
//     </div>  
  
//   );  
  
// };  

// return (
//     <div className="w-full space-y-6"> {/* w-full space hatane ke liye */}
      
//       {/* 1. Header */}
//       <div className="flex justify-between items-center">
//         <div ref={formRef} className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Product Management</h2>
//         {/* <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Inventory Live</span> */}
//       </div>
//       </div>

//       {/* 2. Form Section (Modern Grid Layout) */}
//       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//         <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-widest">
//           {editingId ? 'Edit Product Details' : 'Add New Product'}
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <input
//             type="text"
//             placeholder="Product name"
//             className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="HSN/SAC Code"
//             className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//             value={hsnCode}
//             onChange={(e) => setHsnCode(e.target.value)}
//           />
          
//           <input
//             type="number"
//             placeholder="Price (₹)"
//             className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Stock Quantity"
//             className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//           />
//           <div className="flex flex-col md:col-span-1">
//             <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Discount</label>
//             <div className="flex gap-1">
//               {/* Type Selection Dropdown */}
//               <select
//                 className="p-3 bg-slate-50 border border-slate-200 rounded-l-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 text-xs font-bold"
//                 value={discountType}
//                 onChange={(e) => setDiscountType(e.target.value)}
//               >
//                 <option value="percentage">%</option>
//                 <option value="flat">₹</option>
//               </select>
              
//               {/* Value Input */}
//               <input
//                 type="number"
//                 placeholder={discountType === "percentage" ? "0%" : "₹0"}
//                 className="p-3 bg-slate-50 border border-slate-200 rounded-r-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
//                 value={discountPercentage}
//                 onChange={(e) => setDiscountPercentage(Number(e.target.value))}
//               />
//             </div>
//           </div>
//           {/* <input
//             type="number"
//             placeholder="GST Rate (%)"
//             className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//             value={gstRate}
//             onChange={(e) => setGstRate(e.target.value)}
//           /> */}
//           {/* GST Rate Dropdown */}
//           <div className="flex flex-col">
//             <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">GST Slab</label>
//             <select
//               className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//               value={gstRate}
//               onChange={(e) => setGstRate(Number(e.target.value))}
//             >
//               <option value={0}>0% (Exempted)</option>
//               <option value={5}>5% (Essential)</option>
//               <option value={12}>12% (Standard)</option>
//               <option value={18}>18% (Services/Goods)</option>
//               <option value={28}>28% (Luxury)</option>
//             </select>
//           </div>

//         </div>

//         <div className="mt-6 flex gap-3">
//           {editingId ? (
//             <>
//               <button onClick={updateProduct} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">Update Product</button>
//               <button onClick={clearForm} className="bg-slate-100 text-slate-600 px-8 py-2.5 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
//             </>
//           ) : (
//             <button onClick={addProduct} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
//               + Add Product
//             </button>
//           )}
//         </div>
//       </div>

//       {/* 3. Product List Table */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden w-full">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
//             <tr>
//               <th className="p-4">Product Name</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Discount</th>
//               <th className="p-4">GST</th>
//               <th className="p-4">Stock</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {products.map((product) => (
//               <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
//                 <td className="p-4 font-bold text-slate-700">{product.name}</td>
//                 <td className="p-4 text-slate-600 text-sm">
//                    <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter">{product.category || 'General'}</span>
//                 </td>
//                 <td className="p-4 text-slate-800 font-medium">₹{product.price}</td>
//                 {/* <td className="p-4 text-red-500 font-bold">{product.discountPercentage || 0}%</td> */}

//                 {/* --- TABLE BODY KE ANDAR --- */}
//                 <td className="p-4 text-red-500 font-bold">
//                   {/* Agar discount flat hai toh aage ₹ dikhao */}
//                   {product.discountType === "flat" ? "₹" : ""}
                  
//                   {/* Jo bhi value database se aa rahi hai wo dikhao */}
//                   {product.discountValue || product.discountPercentage || 0}
                  
//                   {/* Agar percentage hai ya type define nahi hai (old products), toh % dikhao */}
//                   {(product.discountType === "percentage" || !product.discountType) ? "%" : ""}
//                 </td>
//                 <td className="p-4 text-slate-500 text-sm font-medium">{product.gstRate || 0}%</td>
//                 <td className="p-4 text-sm font-bold">
//                    <span className={product.stock < 10 ? "text-red-500" : "text-slate-600"}>{product.stock} items</span>
//                 </td>
//                 <td className="p-4 text-center">
//                   <button onClick={() => editProduct(product)} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold mr-2 hover:bg-blue-600 hover:text-white transition-all">Edit</button>
//                   <button onClick={() => deleteProduct(product._id)} className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 4. Pagination */}
//       <div className="flex items-center justify-between px-2 pb-10">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold text-slate-400 disabled:opacity-30 hover:text-blue-600">Previous</button>
//         <span className="text-xs font-black text-slate-400 tracking-widest uppercase">Page {page} of {totalPages}</span>
//         <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="text-sm font-bold text-blue-600 disabled:opacity-30 hover:text-blue-800">Next</button>
//       </div>
//     </div>
//   );
// };
  
// export default Products;


// ===============================  
  // UI RETURN
  // ===============================  
  return (
    <div className="w-full space-y-6 p-4">
      
      {/* 1. Header with Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Product Management</h2>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button 
            onClick={() => { clearForm(); setIsModalOpen(true); }}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 whitespace-nowrap"
          >
            + Add New
          </button>
        </div>
      </div>

      {/* 2. Modal Popup Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); clearForm(); }} 
        title={editingId ? 'Edit Product Details' : 'Add New Product'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Product name"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="HSN/SAC Code"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
            />
            
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Price (₹)"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <input
                type="number"
                placeholder="Min Stock (Box)"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Category"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Discount</label>
                <div className="flex gap-1">
                  <select
                    className="p-3 bg-slate-100 border border-slate-200 rounded-l-xl outline-none text-xs font-bold"
                    value={discountType}
                    onChange={(e) => {
                      setDiscountType(e.target.value);
                      setDiscountPercentage(0);
                    }}
                  >
                    <option value="percentage">%</option>
                    <option value="flat">₹</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Value"
                    className="p-3 bg-slate-50 border border-slate-200 rounded-r-xl outline-none w-full"
                    value={discountPercentage}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (discountType === "percentage" && val > 100) val = 100;
                      if (discountType === "flat" && val > Number(price)) val = Number(price);
                      if (val < 0) val = 0;
                      setDiscountPercentage(val);
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">GST Slab</label>
                <select
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                >
                  <option value={0}>0%</option>
                  <option value={5}>5%</option>
                  <option value={12}>12%</option>
                  <option value={18}>18%</option>
                  <option value={28}>28%</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-t pt-5">
            <button 
              onClick={editingId ? updateProduct : addProduct} 
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg"
            >
              {editingId ? 'Update Product' : 'Save Product'}
            </button>
            <button 
              onClick={() => { setIsModalOpen(false); clearForm(); }} 
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* 3. Product List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Discount</th>
              <th className="p-4">GST</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-700">{product.name}</td>
                <td className="p-4 text-slate-600 text-sm">
                   <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter">{product.category || 'General'}</span>
                </td>
                <td className="p-4 text-slate-800 font-medium">₹{product.price}</td>
                <td className="p-4 text-red-500 font-bold">
                  {product.discountType === "flat" ? "₹" : ""}
                  {product.discountPercentage || 0}
                  {(product.discountType === "percentage" || !product.discountType) ? "%" : ""}
                </td>
                <td className="p-4 text-slate-500 text-sm font-medium">{product.gstRate || 0}%</td>
                <td className="p-4 text-sm font-bold">
                   <span className={product.stock < (product.lowStockThreshold || 10) ? "text-red-500" : "text-slate-600"}>{product.stock} items</span>
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => editProduct(product)} className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold mr-2 hover:bg-blue-600 hover:text-white transition-all">Edit</button>
                  <button onClick={() => deleteProduct(product._id)} className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* 4. Pagination */}
      <div className="flex items-center justify-between px-2 pb-10">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold text-slate-400 disabled:opacity-30 hover:text-blue-600">Previous</button>
        <span className="text-xs font-black text-slate-400 tracking-widest uppercase">Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="text-sm font-bold text-blue-600 disabled:opacity-30 hover:text-blue-800">Next</button>
      </div>
    </div>
  );
};
  
export default Products;