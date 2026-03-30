/*import "../../styles/reports.css";

const InvoiceList = ({ invoices }) => {

  // safety check
  if (!invoices || invoices.length === 0) {
    return (
      <div className="report-card">
        <h3>Invoices</h3>
        <p>No invoices found</p>
      </div>
    );
  }

  return (

    <div className="report-card">

      <h3>Invoice List</h3>

      <table className="invoice-table">

        <thead>

          <tr>
            <th>Invoice No</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Taxable Amount</th>
            <th>GST</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {invoices.map((inv) => (

            <tr key={inv._id}>

              <td>
                {inv.invoiceNumber || "-"}
              </td>

              <td>
                {inv.date
                  ? new Date(inv.date).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {inv.customerName || "-"}
              </td>

              <td>
                ₹{inv.taxableAmount || 0}
              </td>

              <td>
                ₹{inv.totalGST || 0}
              </td>

              <td>
                ₹{inv.totalAmount || 0}
              </td>

              <td>
                {inv.status || "Completed"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default InvoiceList;*/


/*const InvoiceList = ({ invoices }) => {

  if (!invoices || invoices.length === 0) {
    return <p>No invoices found</p>;
  }

  return (

    <div className="report-section">

      <h3>Invoices</h3>

      <table className="report-table">

        <thead>

          <tr>

            <th>Invoice No</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {invoices.map((inv) => (

            <tr key={inv._id}>

              <td>{inv.invoiceNumber}</td>

              <td>{inv.customerName}</td>

              <td>₹{inv.totalAmount}</td>

              <td>
                {new Date(inv.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default InvoiceList;*/


/*const InvoiceTable = ({ invoices }) => {

  if (!invoices || invoices.length === 0) return null;

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center"
        }}
      >
        <thead style={{ backgroundColor: "#0d6efd", color: "white" }}>
          <tr>
            <th style={thStyle}>Invoice No</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Taxable Amount</th>
            <th style={thStyle}>GST</th>
            <th style={thStyle}>Grand Total</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td style={tdStyle}>{inv.invoiceNumber}</td>
              <td style={tdStyle}>{inv.customer?.name || "N/A"}</td>
              <td style={tdStyle}>₹{inv.taxableAmount}</td>
              <td style={tdStyle}>₹{inv.totalGST}</td>
              <td style={tdStyle}>₹{inv.grandTotal}</td>
              <td style={tdStyle}>
                {new Date(inv.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px"
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px"
};

export default InvoiceTable;*/



/*const InvoiceTable = ({ invoices }) => {

  if (!Array.isArray(invoices)) return null;

  return (
    <div className="table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Taxable Amount</th>
            <th>GST</th>
            <th>Grand Total</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => {

            const totalGST =
              (inv.cgst || 0) +
              (inv.sgst || 0) +
              (inv.igst || 0);

            return (
              <tr key={inv._id}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.customerName}</td>
                <td>₹ {inv.subTotal?.toFixed(2)}</td>
                <td>₹ {totalGST.toFixed(2)}</td>
                <td>₹ {inv.totalAmount?.toFixed(2)}</td>
                <td>
                  {new Date(inv.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;*/



const InvoiceList = ({ invoices }) => {

  if (!invoices || invoices.length === 0) {
    return null;
  }

  return (

    <table className="invoice-table">

      <thead>

        <tr>
          <th>Invoice No</th>
          <th>Customer</th>
          <th>Taxable Amount</th>
          <th>Discount</th>
          <th>CGST</th>
          <th>SGST</th>
          <th>IGST</th>
          <th>Total</th>
          <th>Date</th>
        </tr>

      </thead>

      <tbody>

        {invoices.map((inv) => (

          <tr key={inv._id}>

            <td>{inv.invoiceNumber}</td>

            <td>{inv.customerName}</td>

            <td>INR {inv.subTotal?.toFixed(2)}</td>

            <td>INR {((inv.totalDiscount || 0) + (inv.billDiscount || 0)).toFixed(2)}</td>

            <td>INR {inv.cgst?.toFixed(2)}</td>

            <td>INR {inv.sgst?.toFixed(2)}</td>

            <td>INR {inv.igst?.toFixed(2)}</td>

            <td>INR {inv.totalAmount?.toFixed(2)}</td>

            <td>
              {new Date(inv.createdAt).toLocaleDateString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

};

export default InvoiceList;