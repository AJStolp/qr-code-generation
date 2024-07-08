"use client";

import { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [dotType, setDottype] = useState<string>("");
  const [error, setError] = useState<string>("");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 300,
      height: 300,
      margin: 4,
      dotsOptions: {
        color: color,
        type: dotType,
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

    const webUrl = `https://www.${url}`;
    qrCode.current.update({
      data: webUrl,
      image: "/logo.png", // Path to your logo image
    });
    qrCode.current.append(qrCodeRef.current);
  };

  const handleDownload = () => {
    if (!qrCode.current) return;

    qrCode.current.download({
      name: `${url}-qr-code`,
      extension: "png",
    });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to match the part of the URL after "https://www."
    const regex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})?$/;

    setUrl(value);

    if (regex.test(value)) {
      setError("");
    } else {
      setError("Please enter a valid URL part after 'https://www.'");
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Instagram QR Code Generator</h1>
      <section>
        <h2 className="text-xl">Transform your qr-code:</h2>
        <section className="flex flex-col">
          <label htmlFor="dot-select"></label>

          <select
            name="dots"
            id="dot-select"
            onChange={(e) => setDottype(e.target.value)}
            className="text-black"
          >
            <option value="Please choose an option">choose a dot type</option>
            <option value="rounded">rounded</option>
            <option value="dots">dots</option>
            <option value="classy">classy</option>
            <option value="classy-rounded">classy-rounded</option>
            <option value="square">square</option>
            <option value="extra-rounded">extra-rounded</option>
          </select>
        </section>
        <section className="flex flex-col">
          {" "}
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
      </section>
      <section className="flex flex-col">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter the part after 'https://www.'"
          className="text-black my-2 p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleGenerate} className="bg-secondary p-2 rounded">
          Generate QR Code
        </button>
      </section>

      <div ref={qrCodeRef} style={{ margin: "20px 0" }}></div>
      <button
        className="bg-primary rounded p-2 text-text"
        onClick={handleDownload}
      >
        Download QR Code
      </button>
    </div>
  );
}
