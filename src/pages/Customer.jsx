
//with pagination

import { useState, useEffect, useRef } from "react";
import Modal from "../components/Model";
import API from "../api/axios";

const Customers = () => {

  // ===============================
  // STATES
  // ===============================

  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [editingId, setEditingId] = useState(null);

  //const [customerState, setCustomerState] = useState("Gujarat");
  const [state, setState] = useState("Gujarat");

  // pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");


  const formRef = useRef(null);


  // India ki saari States aur UTs ki list GST calculations ke liye
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];


  //API get,add,delete,update
  // ===============================
  // GET CUSTOMERS
  // ===============================
  const getCustomers = async () => {

    try {

      const res = await API.get(`/customers?page=${page}&limit=5&search=${searchTerm}`);

      setCustomers(res.data.customers || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {

      console.log("Error fetching customers");

    }

  };


  // ===============================
  // ADD CUSTOMER
  // ===============================
  const addCustomer = async () => {

    try {

      await API.post("/customers/add", {
        name,
        mobile,
        email,
        address,
        gstNumber,
        state: state,
      });

      alert("Customer added successfully");

      setIsModalOpen(false);
      clearForm();
      getCustomers();

    } catch (error) {

      alert(error.response?.data?.msg || "Error adding customer");

    }

  };


  // ===============================
  // DELETE CUSTOMER
  // ===============================
  const deleteCustomer = async (id) => {

    if (!window.confirm("Delete this customer?")) return;

    try {

      await API.delete(`/customers/${id}`);

      alert("Customer deleted");

      getCustomers();

    } catch {

      alert("Error deleting customer");

    }

  };


  // ===============================
  // EDIT CUSTOMER
  // ===============================
  const editCustomer = (customer) => {

    setEditingId(customer._id);

    setName(customer.name);
    setMobile(customer.mobile);
    setEmail(customer.email);
    setAddress(customer.address);
    setGstNumber(customer.gstNumber);
    setState(customer.state || "Gujarat");
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsModalOpen(true);

  };


  // ===============================
  // UPDATE CUSTOMER
  // ===============================
  const updateCustomer = async () => {

    try {

      await API.put(`/customers/${editingId}`, {
        name,
        mobile,
        email,
        address,
        gstNumber,
        state
      });

      alert("Customer updated");

      setIsModalOpen(false);
      clearForm();
      getCustomers();

    } catch (error) {

      alert(error.response?.data?.msg || "Error updating customer");

    }

  };


  // ===============================
  // CLEAR FORM
  // ===============================
  const clearForm = () => {

    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
    setGstNumber("");
    setEditingId(null);
    setState("Gujarat");
    setIsModalOpen(false);

  };


  // ===============================
  // LOAD DATA
  // ===============================
  useEffect(() => {

    getCustomers();

  }, [page, searchTerm]);



  // ===============================
  // UI
  // ===============================
//   return (

//     <div className="space-y-3">
//       {/* 1.Header Section: Title aur Dashboard Context  */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-slate-800">
//           Customer Management
//         </h2>
//       </div>


//       {/* FORM */}

//       <input
//         type="text"
//         placeholder="Customer Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Mobile"
//         value={mobile}
//         onChange={(e) => setMobile(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />

//       <br /><br />

//       <input
//         type="text"
//         placeholder="GST Number"
//         value={gstNumber}
//         onChange={(e) => setGstNumber(e.target.value)}
//       />

//       <br /><br />


//       {/* ADD / UPDATE BUTTON */}

//       {
//         editingId ? (
//           <>
//             <button onClick={updateCustomer}>
//               Update Customer
//             </button>

//             <button
//               onClick={clearForm}
//               style={{ marginLeft: "10px" }}
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button onClick={addCustomer}>
//             Add Customer
//           </button>
//         )
//       }

//       <hr />


//       {/* CUSTOMER LIST */}

//       <h3>Customer List</h3>

//       <div style={{
//         display: "flex",
//         gap: "30px",
//         fontWeight: "bold",
//         borderBottom: "2px solid black",
//         padding: "10px"
//       }}>
//         <span style={{ width: "150px" }}>Name</span>
//         <span style={{ width: "120px" }}>Mobile</span>
//         <span style={{ width: "200px" }}>Email</span>
//         <span style={{ width: "200px" }}>Action</span>
//       </div>


//       {
//         customers.map((customer) => (

//           <div key={customer._id}
//             style={{
//               display: "flex",
//               gap: "30px",
//               padding: "10px",
//               borderBottom: "1px solid #ccc"
//             }}
//           >

//             <span style={{ width: "150px" }}>
//               {customer.name}
//             </span>

//             <span style={{ width: "120px" }}>
//               {customer.mobile}
//             </span>

//             <span style={{ width: "200px" }}>
//               {customer.email}
//             </span>

//             <span>

//               <button
//                 onClick={() => editCustomer(customer)}
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteCustomer(customer._id)}
//                 style={{ marginLeft: "10px", color: "red" }}
//               >
//                 Delete
//               </button>

//             </span>

//           </div>

//         ))
//       }


//       {/* PAGINATION */}

//       <div style={{ marginTop: "20px" }}>

//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Previous
//         </button>

//         <span style={{ margin: "0 10px" }}>
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

// export default Customers;


// return (
//     <div className="w-full min-h-screen space-y-6">
//       {/* 1. Header Section: Title aur Dashboard Context */}
//       <div className="flex justify-between items-center">
//         <div ref={formRef} className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-slate-800">Customer Management</h2>
//         {/* <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">● Live Database</span> */}
//       </div>
//       </div>

//       {/* 2. Form Section: Isme grid use kiya hai taaki inputs 3 columns mein dikhein */}
//       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//         <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">{editingId ? 'Edit Customer' : 'Add New Customer'}</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
//           <input
//             type="text"
//             placeholder="Customer Name"
//             // 1. Text color ko force karein (slate-800 ya black)
//             className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 w-full"
//             value={name}
//             onChange={(e) => {
//               //console.log("Typing:", e.target.value); // Check karne ke liye console kholein
//               setName(e.target.value);
//             }}
// />
//           <input
//             type="text"
//             placeholder="Mobile"
//             className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 w-full"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 w-full"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="Address"
//             className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 w-full"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="GST Number"
//             className="p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 w-full"
//             value={gstNumber}
//             onChange={(e) => setGstNumber(e.target.value)}
//           />

//           {/* ✨ State Dropdown */}
//           <div className="flex flex-col">
//             <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">State (For GST/IGST)</label>
//             <select
//               className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//             >
//               {indianStates.map((s) => (
//                 <option key={s} value={s}>{s}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Buttons: Primary Blue Action Button */}
//         <div className="mt-6 flex gap-3">
//           {editingId ? (
//             <>
//               <button onClick={updateCustomer} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700">Update</button>
//               <button onClick={clearForm} className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
//             </>
//           ) : (
//             <button onClick={addCustomer} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">Add Customer</button>
//           )}
//         </div>
//       </div>

//       {/* 3. Table Section: Clean list view with proper headers */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-50 border-b border-slate-100">
//             <tr>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase">Customer Name</th>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mobile</th>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase">Email</th>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase">State</th>
//               <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {customers.map((customer) => (
//               <tr key={customer._id} className="hover:bg-slate-50 transition-all">
//                 <td className="p-4 font-bold text-slate-700">{customer.name}</td>
//                 <td className="p-4 text-slate-600 text-sm">{customer.mobile}</td>
//                 <td className="p-4 text-slate-600 text-sm">{customer.email}</td>
//                 <td className="p-4 text-slate-600 text-sm">
//                   <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold uppercase">
//                     {customer.state || "Gujarat"}
//                   </span>
//                 </td>
//                 <td className="p-4 text-center">
//                   <button onClick={() => editCustomer(customer)} className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-xs font-bold mr-2 hover:bg-blue-600 hover:text-white transition-all">Edit</button>
//                   <button onClick={() => deleteCustomer(customer._id)} className="text-red-600 bg-red-50 px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 4. Pagination Section */}
//       <div className="flex items-center justify-between px-4">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)} className="text-sm font-bold text-slate-500 disabled:opacity-30">Previous</button>
//         <span className="text-sm font-bold text-slate-400">Page {page} of {totalPages}</span>
//         <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="text-sm font-bold text-blue-600 disabled:opacity-30">Next</button>
//       </div>
//     </div>
//   );
// };

// export default Customers;




return (
    <div className="w-full min-h-screen space-y-6 p-4">
      
      {/* 1. Header Section with Add Button */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Customer Management</h2>

        {/* --- SEARCH INPUT --- */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by name, mobile..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Naya search karne par page 1 par reset karein
            }}
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button 
          onClick={() => { clearForm(); setIsModalOpen(true); }}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          + Add New Customer
        </button>
      </div>

      {/* 2. Modal Form Section (Popup) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); clearForm(); }} 
        title={editingId ? 'Edit Customer' : 'Add New Customer'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Mobile Number"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="text"
              placeholder="Full Address"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="GST Number (Optional)"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
              />
              <div className="flex flex-col">
                <select
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons inside Modal */}
          <div className="mt-6 flex gap-3 border-t pt-5">
            <button 
              onClick={editingId ? updateCustomer : addCustomer} 
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg"
            >
              {editingId ? 'Update Customer' : 'Save Customer'}
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

      {/* 3. Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden w-full">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Email</th>
              <th className="p-4">State</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((customer) => (
              <tr key={customer._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-700">{customer.name}</td>
                <td className="p-4 text-slate-600 text-sm">{customer.mobile}</td>
                <td className="p-4 text-slate-600 text-sm">{customer.email || 'N/A'}</td>
                <td className="p-4 text-sm">
                   <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter">
                     {customer.state || 'Gujarat'}
                   </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => { editCustomer(customer); setIsModalOpen(true); }} 
                    className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold mr-2 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteCustomer(customer._id)} 
                    className="text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination */}
      <div className="flex items-center justify-between px-2 pb-10">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)} 
          className="text-sm font-bold text-slate-400 disabled:opacity-30 hover:text-blue-600"
        >
          Previous
        </button>
        <span className="text-xs font-black text-slate-400 tracking-widest uppercase">
          Page {page} of {totalPages}
        </span>
        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)} 
          className="text-sm font-bold text-blue-600 disabled:opacity-30 hover:text-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;