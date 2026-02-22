const UnitsToggle = () => {
  return (
    <div className="units-toggle">
      <button
        className="units-toggle__button"
        type="button"
        aria-haspopup="listbox"
        aria-label="Change units"
      >
        <span>Units</span>
        <span className="units-toggle__chevron" aria-hidden="true">
          ▾
        </span>
      </button>
      {/* Dropdown list will go here later */}
    </div>
  );
};

export default UnitsToggle;