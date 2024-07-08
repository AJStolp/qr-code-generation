"use client";

import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";

export default function QRCodeGenerator() {
  const [username, setUsername] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [dotType, setDottype] = useState<string>("");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  console.log(color, "color");

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: color,
        type: dotType, // 'rounded', 'dots', 'classy', 'classy-rounded', 'square', 'extra-rounded'
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });
  }, [color, backgroundColor, dotType]);

  const handleGenerate = () => {
    if (!qrCode.current || !qrCodeRef.current) return;

    const instagramUrl = `https://www.instagram.com/${username}`;
    qrCode.current.update({
      data: instagramUrl,
      image: "/logo.png", // Path to your logo image
    });
    qrCode.current.append(qrCodeRef.current);
  };

  const handleDownload = () => {
    if (!qrCode.current) return;

    qrCode.current.download({
      name: `${username}-qr-code`,
      extension: "png",
    });
  };

  return (
    <div>
      <h1>Instagram QR Code Generator</h1>
      <section>
        <h2>transform:</h2>
        <label htmlFor="pet-select">Choose a dot type:</label>

        <select
          name="pets"
          id="pet-select"
          onChange={(e) => setDottype(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value="rounded">rounded</option>
          <option value="dots">dots</option>
          <option value="classy">classy</option>
          <option value="classy-rounded">classy-rounded</option>
          <option value="square">square</option>
          <option value="extra-rounded">extra-rounded</option>
        </select>
        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          onChange={(e) => setColor(e.target.value)}
          className="text-black"
        ></input>
        <label htmlFor="bg-color">Background Color</label>
        <input
          type="color"
          id="bg-color"
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="text-black"
        ></input>
      </section>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Instagram username"
        className="text-black"
      />
      <button onClick={handleGenerate}>Generate QR Code</button>
      <div ref={qrCodeRef} style={{ margin: "20px 0" }}></div>
      <button onClick={handleDownload}>Download QR Code</button>
    </div>
  );
}
