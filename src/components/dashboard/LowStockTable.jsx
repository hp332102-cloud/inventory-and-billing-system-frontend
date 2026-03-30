import React from 'react';

const LowStockTable = ({ products, onRestock }) => {

  return (
    <div className="low-stock-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th style={{ textAlign: "center" }}>Current Stock</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((p) => {
              const isLow = p.stock < (p.lowStockThreshold || 10);
              return (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  
                  <td style={{ textAlign: "center" }}>
                    <span style={{ 
                      color: isLow ? '#dc3545' : '#856404', 
                      backgroundColor: isLow ? '#f8d7da' : '#fff3cd',
                      fontWeight: 'bold',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      display: 'inline-block',
                      minWidth: '30px'
                    }}>
                      {p.stock}
                    </span>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button 
                      className="restock-btn-modern" 
                      onClick={() => onRestock(p)}
                    >
                      Restock
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                All products are well-stocked! ✅
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockTable;