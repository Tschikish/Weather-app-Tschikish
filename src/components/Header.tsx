import React from "react";

function Header() {
  return (
    <>
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark"></div>
          <span className="brand-name">Weather Now</span>
        </div>

        <button className="units-toggle">
          <span>Units</span>
        </button>
      </header>
    </>
  );
}
