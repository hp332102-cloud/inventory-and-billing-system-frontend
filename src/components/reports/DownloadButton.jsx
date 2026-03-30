const DownloadButton = ({ onDownload }) => {

  return (

    <button
      className="btn btn-success"
      onClick={onDownload}
    >
      Download PDF
    </button>

  );

};

export default DownloadButton;