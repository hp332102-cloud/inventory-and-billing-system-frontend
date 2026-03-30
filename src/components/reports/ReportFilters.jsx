const ReportFilters = ({
  month,
  year,
  setMonth,
  setYear,
  onSearch
}) => {

  return (
    <div className="filters">

      <input
        type="number"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={onSearch}
      >
        Get Report
      </button>

    </div>
  );

};

export default ReportFilters;