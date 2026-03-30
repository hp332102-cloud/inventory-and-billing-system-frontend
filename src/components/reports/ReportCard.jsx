const ReportCard = ({ title, value }) => {

  return (

    <div className="summary-box">

      <h4>{title}</h4>

      <h2>₹{value}</h2>

    </div>

  );

};

export default ReportCard;