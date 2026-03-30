
import { useState, useEffect } from "react";
import API from "../api/axios";

const Invoice = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [billDiscount, setBillDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("percentage"); // "percentage" ya "flat"

  // Load Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, prodRes] = await Promise.all([
          API.get("/customers?limit=1000"),
          API.get("/products?limit=1000")
        ]);
        setCustomers(custRes.data.customers || custRes.data);
        setProducts(prodRes.data.products || prodRes.data);
      } catch (err) { console.error("Data load error", err); }
    };
    fetchData();
  }, []);

  /*const addItem = () => {
    const product = products.find(p => p._id === selectedProduct);
    if (!product) return alert("Pehle product select karein");

    const price = product.price;
    const itemGstRate = product.gstRate || 0; // Use product's GST rate
    const gst = price * (itemGstRate / 100);
    const totalPrice = (price + gst) * quantity;

    const newItem = {
      product: product._id,
      name: product.name,
      price,
      quantity,
      gst,
      gstRate: itemGstRate,
      totalPrice
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    calculateTotal(updatedItems);
    setSelectedProduct("");
    setQuantity(1);
  };*/

//   const addItem = () => {
//   const product = products.find((p) => p._id === selectedProduct);
//   if (!product) return alert("Pehle product select karein");

//   // Input values ko numbers mein convert karein
//   const price = Number(product.price) || 0;
//   const qty = Number(quantity) || 1;
  
//   // 1. Product se default discount lein (agar product mein discountPercentage save hai)
//   const discPercent = Number(product.discountPercentage) || 0; 
//   const rawTotal = price * qty;
//   const discAmount = (rawTotal * discPercent) / 100;
  
//   // 2. Taxable Value (Discount ke baad wala price)
//   const taxableValue = rawTotal - discAmount;

//   // 3. GST Calculation (Taxable Value par)
//   const itemGstRate = Number(product.gstRate) || 0;
//   const itemGstAmount = (taxableValue * itemGstRate) / 100;

//   // 4. Final Item Total
//   const totalPrice = taxableValue + itemGstAmount;

//   const newItem = {
//     product: product._id,
//     name: product.name,
//     price: price,
//     quantity: qty,
//     discountPercent: discPercent,
//     discountAmount: discAmount, // Ye summary ke liye zaruri hai
//     taxableValue: taxableValue,
//     gstRate: itemGstRate,
//     gstAmount: itemGstAmount,   // Ye summary ke liye zaruri hai
//     totalPrice: totalPrice
//   };

//   const updatedItems = [...items, newItem];
//   setItems(updatedItems);
//   calculateTotal(updatedItems);
  
//   // Reset inputs
//   setSelectedProduct("");
//   setQuantity(1);
// };


const addItem = () => {
  const product = products.find((p) => p._id === selectedProduct);
  if (!product) return alert("Pehle product select karein");

  const price = Number(product.price) || 0;
  const qty = Number(quantity) || 1;
  
  // ✨ Yahan Change Karein: Product ka Discount Type check karein
  const discVal = Number(product.discountPercentage) || 0; 
  const dType = product.discountType || "percent"; // Agar backend se type aa raha hai toh
  
  const rawTotal = price * qty;
  let discAmount = 0;

  // New Logic for Per Product Discount
  if (dType === "percentage") {
    discAmount = (rawTotal * discVal) / 100;
  } else {
    discAmount = discVal; // Direct flat amount
  }
  
  const taxableValue = rawTotal - discAmount;
  const itemGstRate = Number(product.gstRate) || 0;
  const itemGstAmount = (taxableValue * itemGstRate) / 100;
  const totalPrice = taxableValue + itemGstAmount;

  const newItem = {
    product: product._id,
    name: product.name,
    price: price,
    quantity: qty,
    discountType: dType, // Store type
    discountPercent: dType === "percentage" ? discVal : 0, // For percentage
    discountValue: discVal, // Original value (either % or ₹)
    discountAmount: discAmount, 
    taxableValue: taxableValue,
    gstRate: itemGstRate,
    gstAmount: itemGstAmount,
    totalPrice: totalPrice
  };

  setItems([...items, newItem]);
  calculateTotal([...items, newItem]);
  setSelectedProduct("");
  setQuantity(1);
};

  /*const addItem = () => {
  const product = products.find(p => p._id === selectedProduct);
  if (!product) return alert("Pehle product select karein");

  const price = product.price;
  const qty = quantity;
  
  // 1. Discount nikalein (Product default use karein)
  const discPercent = product.discountPercentage || 0;
  const rawTotal = price * qty;
  const discAmount = (rawTotal * discPercent) / 100;
  
  // 2. Taxable Value (Discount minus karne ke baad)
  const taxableValue = rawTotal - discAmount;

  // 3. GST Taxable value par calculate karein
  const itemGstRate = product.gstRate || 0;
  const totalGstAmount = taxableValue * (itemGstRate / 100);

  // 4. Final Price for this item
  const totalPrice = taxableValue + totalGstAmount;

  const newItem = {
    product: product._id,
    name: product.name,
    price,
    quantity: qty,
    discountPercent: discPercent, // Store karein
    discountAmount: discAmount,   // Store karein
    taxableValue: taxableValue,
    gstRate: itemGstRate,
    gstAmount: totalGstAmount,    // Store karein
    totalPrice: totalPrice
  };

  const updatedItems = [...items, newItem];
  setItems(updatedItems);
  calculateTotal(updatedItems);
  setSelectedProduct("");
  setQuantity(1);
};*/

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  /*const updateQty = (index, delta) => {
    const updatedItems = [...items];
    const newQty = updatedItems[index].quantity + delta;
    if (newQty < 1) return;

    updatedItems[index].quantity = newQty;
    updatedItems[index].totalPrice = (updatedItems[index].price + updatedItems[index].gst) * newQty;
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };*/

  const updateQty = (index, delta) => {
  const updatedItems = [...items];
  const item = updatedItems[index];
  const newQty = item.quantity + delta;
  if (newQty < 1) return;

  item.quantity = newQty;
  
  const rawTotal = item.price * newQty;
  let discAmount = 0;
  if (item.discountType === "percentage") {
    discAmount = (rawTotal * item.discountValue) / 100;
  } else {
    discAmount = item.discountValue; // Flat per line
  }
  
  const taxable = rawTotal - discAmount;
  const gstAmt = taxable * (item.gstRate / 100);

  item.discountAmount = discAmount;
  item.taxableValue = taxable;
  item.gstAmount = gstAmt;
  item.totalPrice = taxable + gstAmt;

  setItems(updatedItems);
  calculateTotal(updatedItems);
};

  const calculateTotal = (itemsList) => {
    const sum = itemsList.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotal(sum);
  };

  const saveInvoice = async () => {
    try {
      const currentSubTotalRaw = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity) || 0), 0);
      const currentTotalItemDiscount = items.reduce((sum, item) => sum + (Number(item.discountAmount) || 0), 0);
      const currentTaxableBeforeBillDiscount = currentSubTotalRaw - currentTotalItemDiscount;
      
      if (discountType === "percentage" && Number(billDiscount) > 100) {
         alert("Bill discount percentage cannot exceed 100%");
         return;
      }
      if (discountType === "flat" && Number(billDiscount) > currentTaxableBeforeBillDiscount) {
         alert("Bill flat discount cannot exceed the taxable value");
         return;
      }

      const customer = customers.find(c => c._id === selectedCustomer);
      if (!customer || items.length === 0) return alert("Customer aur items zaruri hain");

      await API.post("/invoices", {
        customerId: customer._id,
        customerName: customer.name,
        customerEmail: customer.email,
        items: items,

        subTotal: finalTaxableValue,
        totalDiscount: totalItemDiscount,
        billDiscount: extraBillDiscount,
        totalAmount: finalGrandTotal,
        billDiscountValue: billDiscount,
        billDiscountType: discountType
      });

      alert("Invoice saved successfully");
      setItems([]);
      setTotal(0);
      setSelectedCustomer("");
    } catch (error) {
      alert(error.response?.data?.message || "Invoice save karne mein error");
    }
  };

  // Sum up all individual GST amounts
  // const gstAmount = items.reduce((sum, item) => sum + (item.gst * item.quantity), 0);
  // const subtotal = total - gstAmount;

  // const totalDiscount = items.reduce((sum, item) => sum + (Number(item.discountAmount) || 0), 0);
  // const totalGst = items.reduce((sum, item) => sum + (Number(item.gstAmount) || 0), 0);
  // const subTotalRaw = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity) || 0), 0);
  // const finalGrandTotal = (subTotalRaw - totalDiscount) + totalGst;

  // 1. Pehle basic totals nikalein
  const totalItemDiscount = items.reduce((sum, item) => sum + (Number(item.discountAmount) || 0), 0);
  const subTotalRaw = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity) || 0), 0);
  const rawGst = items.reduce((sum, item) => sum + (Number(item.gstAmount) || 0), 0);

  // 2. Taxable value (Items total - Item discount)
  const taxableBeforeBillDiscount = subTotalRaw - totalItemDiscount;

  // 3. ✨ BILL DISCOUNT LOGIC (Amuk amount par)
  // let extraBillDiscount = 0;
  // const DISCOUNT_CUTOFF_DATE = new Date("2026-03-24T00:00:00.000Z");
  // const isNewInvoiceEra = new Date() >= DISCOUNT_CUTOFF_DATE;

  // if (isNewInvoiceEra && taxableBeforeBillDiscount >= 50000) { // Agar 50000 se zyada ka bill hai
  //   extraBillDiscount = (taxableBeforeBillDiscount * 5) / 100; // 5% Discount
  // }

  // 3. ✨ BILL DISCOUNT LOGIC (Manual + Automatic logic combined)
  let extraBillDiscount = 0;
  
  if (discountType === "percentage") {
    // Percentage logic: Taxable * Value / 100, capped at 100%
    const pVal = Math.min(billDiscount, 100);
    extraBillDiscount = (taxableBeforeBillDiscount * pVal) / 100;
  } else {
    // Flat amount logic: Direct minus
    extraBillDiscount = billDiscount;
  }

  // Security check: Discount bill amount se zyada na ho jaye
  if (extraBillDiscount > taxableBeforeBillDiscount) extraBillDiscount = taxableBeforeBillDiscount;

  // 4. Final Values
  const finalTaxableValue = taxableBeforeBillDiscount - extraBillDiscount;

  // GST ko proportionaly adjust karna (Discount ke baad GST kam hota hai)
  const totalGst = (extraBillDiscount > 0 && taxableBeforeBillDiscount > 0)
    ? rawGst * (finalTaxableValue / taxableBeforeBillDiscount) 
    : rawGst;

  const finalGrandTotal = finalTaxableValue + totalGst;

  const selectedCustomerObj = customers.find(c => c._id === selectedCustomer);
  const isInterState = selectedCustomerObj?.state ? selectedCustomerObj.state.toLowerCase() !== "gujarat" : false;

  return (
    <div className="w-full space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-slate-800">Create New Invoice</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Selectors */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Customer</label>
            <select
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800 mb-4"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">Select Customer</option>
              {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>

            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Product</label>
            <select
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800 mb-4"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map(p => <option key={p._id} value={p._id}>{p.name} - ₹{p.price}</option>)}
            </select>

            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Quantity</label>
            <input
              type="number" min="1"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-800 mb-6"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <button onClick={addItem} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              + Add to Invoice
            </button>
          </div>
        </div>

        {/* Right Section: Item List & Bill */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Price + GST</th>
                  <th className="p-4 text-right">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="p-4 font-bold text-slate-700">{item.name}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(index, -1)} className="w-6 h-6 bg-slate-100 rounded text-slate-600">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQty(index, 1)} className="w-6 h-6 bg-slate-100 rounded text-slate-600">+</button>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">
                      ₹{(item.price || 0).toFixed(2)} 
                      {item.discountAmount > 0 && <span className="text-red-400"> - ₹{item.discountAmount.toFixed(2)}</span>}
                      {" "}+ GST({item.gstRate}%): ₹{(item.gstAmount || 0).toFixed(2)}
                    </td>
                    <td className="p-4 text-right font-bold text-slate-800">₹{(item.totalPrice || 0).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bill Discount Input Section */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Apply Bill Discount</h4>
              <p className="text-[10px] text-slate-500 italic mt-1">*Applicable on taxable value</p>
            </div>
            
            <div className="flex border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <select 
                className="bg-slate-50 p-2 text-sm font-bold border-r outline-none text-slate-600 cursor-pointer"
                value={discountType}
                onChange={(e) => {
                  setDiscountType(e.target.value);
                  setBillDiscount(0);
                }}
              >
                <option value="percentage">% Percent</option>
                <option value="flat">₹ Flat</option>
              </select>
              <input 
                type="number" 
                className="w-24 p-2 outline-none text-center font-bold text-blue-600"
                placeholder="0"
                value={billDiscount}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (discountType === "percentage" && val > 100) val = 100;
                  if (discountType === "flat" && val > taxableBeforeBillDiscount) val = taxableBeforeBillDiscount;
                  if (val < 0) val = 0;
                  setBillDiscount(val);
                }}
              />
            </div>
          </div>
          {/* Billing Summary */}
          {/* <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl shadow-slate-200">
            <div className="flex justify-between mb-2 text-slate-400 text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-slate-400 text-sm">
              <span>Total GST</span>
              <span>₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-700 mb-4" />
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total Amount</span>
              <span className="text-2xl font-black text-blue-400">₹{total.toFixed(2)}</span>
            </div>
            <button onClick={saveInvoice} className="w-full mt-6 bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-400 transition-all active:scale-95 shadow-lg shadow-blue-900/20">
              Save & Generate Invoice
            </button>
          </div> */}

          <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl shadow-slate-200">
  
          {/* 1. MRP Total (Bina discount ke) */}
          <div className="flex justify-between mb-2 text-slate-400 text-sm">
            <span>Gross Total</span>
            <span>₹{subTotalRaw.toFixed(2)}</span>
          </div>

          {/* 2. Discount (Lal rang mein) */}
          <div className="flex justify-between mb-2 text-red-400 text-sm font-medium">
            <span>Item Discount</span>
            <span>- ₹{totalItemDiscount.toFixed(2)}</span>
          </div>

          {/*Extra bill Discount*/}
          {extraBillDiscount > 0 && (
            <div className="flex justify-between mb-2 text-yellow-400 text-sm font-bold border-y border-slate-700 py-1">
              <span>
                Special Bill Discount ({discountType === "percentage" ?billDiscount + "%" : "₹" + billDiscount})
              </span>
            
              <span>
                - RS{extraBillDiscount.toFixed(2)}
              </span>
              </div>
          )}

          {/* 3. Taxable Amount (Jis par GST lagega) */}
          {/* <div className="flex justify-between mb-2 text-slate-300 text-sm italic">
            <span>Taxable Value</span>
            <span>₹{(subTotalRaw - totalItemDiscount).toFixed(2)}</span>
          </div> */}

          {/* 4. ✨ UPDATE: Final Taxable Value (Ab ye Customer ko samajh aayega) */}
          <div className="flex justify-between mb-2 text-slate-300 text-sm italic font-bold">
            <span>Taxable Value (After Discount)</span>
            <span>₹{finalTaxableValue.toFixed(2)}</span>
          </div>

          
          {/* 4. GST Total with Dynamic Label */}
          {(() => {
            const rates = [...new Set(items.map(i => i.gstRate || 0))];
            const effectiveTotalRate = finalTaxableValue > 0 ? (totalGst / finalTaxableValue * 100) : 0;
            const labelRate = items.length === 0 ? "0%" : (rates.length === 1 ? `${rates[0]}%` : `${effectiveTotalRate.toFixed(2)}%`);
            const splitLabel = items.length === 0 ? "0%" : (rates.length === 1 ? (rates[0] / 2) + "%" : `${(effectiveTotalRate / 2).toFixed(2)}%`);
            
            return isInterState ? (
              <div className="flex justify-between mb-4 text-slate-400 text-sm">
                <span>IGST ({labelRate})</span>
                <span>₹{totalGst.toFixed(2)}</span>
              </div>
            ) : (
              <>
                <div className="flex justify-between mb-1 text-slate-400 text-sm">
                  <span>CGST ({splitLabel})</span>
                  <span>₹{(totalGst / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-slate-400 text-sm">
                  <span>SGST ({splitLabel})</span>
                  <span>₹{(totalGst / 2).toFixed(2)}</span>
                </div>
              </>
            );
          })()}

          <div className="h-px bg-slate-700 mb-4" />

          {/* 5. Final Bill */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total Amount</span>
            <span className="text-2xl font-black text-blue-400">₹{finalGrandTotal.toFixed(2)}</span>
          </div>

          <button onClick={saveInvoice} className="w-full mt-6 bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-400 transition-all shadow-lg shadow-blue-900/20">
            Save & Generate Invoice
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;