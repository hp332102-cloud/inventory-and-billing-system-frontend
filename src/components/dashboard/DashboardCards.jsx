import { useNavigate } from 'react-router-dom';

const DashboardCards = ({ data, cancelledCount }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-cards">
      {/* Click karne par Invoices page par le jayega */}
      <div className="stat-card invoices" onClick={() => navigate("/invoices")} style={{ cursor: 'pointer' , borderBottom: 'none',boxShadow:'none'}}>
        <h3>Total Invoices</h3>
        <p>{data.totalInvoices}</p>
      </div>

      {/* Click karne par Products page par le jayega */}
      <div className="stat-card products" onClick={() => navigate("/products")} style={{ cursor: 'pointer' , borderBottom: 'none',boxShadow:'none'}}>
        <h3>Total Products</h3>
        <p>{data.totalProducts}</p>
      </div>

      {/* Click karne par Customers page par le jayega */}
      <div className="stat-card customers" onClick={() => navigate("/customers")} style={{ cursor: 'pointer', borderBottom: 'none',boxShadow:'none' }}>
        <h3>Total Customers</h3>
        <p>{data.totalCustomers}</p>
      </div>

      <div className="stat-card sales" style={{ borderBottom: 'none',boxShadow: 'none'}}>
        <h3 style={{ marginBottom: "8px" }}>Total Sales</h3>
        <div>
          <p style={{ margin: 0 }}>₹{data.totalSales.toLocaleString('en-IN')}</p>
        </div>
      </div>
      
      {/* 5th empty space cell under 'Total Products' */}
      {cancelledCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <span style={{ fontSize: '13px', color: '#666', fontWeight: 'normal' }}>
            Note: you have <b>{cancelledCount}</b> cancelled invoice{cancelledCount > 1 ? 's' : ''} in database.
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardCards;