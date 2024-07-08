"use client";
import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

const QRCodeGenerator: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const instagramUrl = `https://www.instagram.com/${username}`;

    try {
      // Generate QR code on the canvas
      await QRCode.toCanvas(canvas, instagramUrl, {
        margin: 2,
        width: 800, // Increase width for higher resolution
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      // Load and draw the logo in the center
      const logo = new Image();
      logo.src = "/logo.png"; // Ensure this path is correct
      logo.onload = () => {
        const logoSize = 200; // Adjust the logo size for higher resolution
        const centerX = (canvas.width - logoSize) / 2;
        const centerY = (canvas.height - logoSize) / 2;
        context.drawImage(logo, centerX, centerY, logoSize, logoSize);
      };
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png", 1.0); // 1.0 for full quality
    link.download = `${username}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <canvas
        ref={canvasRef}
        width={800} // Increased width for higher resolution
        height={800} // Increased height for higher resolution
        style={{ display: "block", margin: "20px 0" }}
      ></canvas>
      <button onClick={handleDownload}>Download QR Code</button>
    </div>
  );
};

export default QRCodeGenerator;
