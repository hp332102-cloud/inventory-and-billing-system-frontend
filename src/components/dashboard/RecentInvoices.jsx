import React from 'react';

const RecentInvoices = ({ invoices }) => {
  return (
    <div className="recent-invoices-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th> 
          </tr>
        </thead>
        <tbody>
          {invoices && invoices.length > 0 ? (
            invoices.map((inv) => (
              <tr key={inv._id}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.customerName}</td>
                <td>₹{inv.totalAmount}</td>
                <td>
                  
                  <span style={{ 
                    color: inv.status === 'Cancelled' ? '#dc3545' : '#28a745', 
                    fontWeight: 'bold',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: inv.status === 'Cancelled' ? '#f8d7da' : '#d4edda',
                    fontSize: '12px'
                  }}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No invoices found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentInvoices;