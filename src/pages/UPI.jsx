import React from "react";

function UPI() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Donate Using UPI</h2>

      <p>Scan the QR Code using GPay / PhonePe / Paytm</p>

      <img 
        src="/qr.png" 
        alt="UPI QR Code" 
        style={{ width: "250px", marginTop: "20px" }}
      />

      <p style={{ marginTop: "20px" }}>
        UPI ID: help@upi
      </p>
    </div>
  );
}

export default UPI;