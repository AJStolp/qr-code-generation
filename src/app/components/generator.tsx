"use client";

import { useState } from "react";

export default function QRCodeGenerator() {
  const [username, setUsername] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const handleGenerate = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        setQrCodeUrl(data.qrCodeUrl);
      } else {
        console.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div>
      <h1>Instagram QR Code Generator</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Instagram username"
        className="text-black"
      />
      <button onClick={handleGenerate}>Generate QR Code</button>
      {qrCodeUrl && (
        <div>
          <h3>QR Code:</h3>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img src={qrCodeUrl} alt="QR Code" />
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50px", // Adjust the size as needed
                height: "50px", // Adjust the size as needed
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
