const Loader = ({ text, size }) => {
  return (
    <div className="loader-container">
      <div className={`loader-spinner ${size || ''}`}></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
