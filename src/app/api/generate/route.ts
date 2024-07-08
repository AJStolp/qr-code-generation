import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      { message: "Username is required" },
      { status: 400 }
    );
  }

  const instagramUrl = `https://www.instagram.com/${username}`;

  try {
    const qrCodeUrl = await QRCode.toDataURL(instagramUrl, {
      margin: 2,
      color: {
        dark: "#000000", // QR code color
        light: "#FFFFFF", // Background color
      },
    });

    const response = NextResponse.json({ qrCodeUrl });
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating QR code" },
      { status: 500 }
    );
  }
}
