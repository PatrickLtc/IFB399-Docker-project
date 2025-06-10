import React, { useEffect, useState } from "react";
import "./App.css";
import MyDropdown from "./components/DataDisplay"; // where dropdown lives


function App() {
    

  return (
    <div className="app-container">
      <div className="lookup-card">
        <div className="logo-section">
          <img
            src="https://img.icons8.com/ios-filled/100/folder-invoices.png"
            alt="Lookup Logo"
            className="logo"
          />
          <div>
            <h2 className="title">GLB Lookup Information</h2>
            <p className="subtitle">
              Please select the look up categories, specific information will be returned.
            </p>
          </div>
        </div>

        <div className="category-info">
          <h3>Category Information</h3>
          <div className="lookup-section">
            <label htmlFor="lookup-type">Lookup Type</label>
            <div></div>
           <MyDropdown />
          </div>
        </div>

         
      </div>

      
      <footer className="footer">© 2025 My Application</footer>
    </div>
  );
}

export default App;
