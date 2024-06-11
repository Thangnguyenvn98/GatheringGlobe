import QRCode from "qrcode";

const generateQRCode = async (qrCodeData: string) => {
  try {
    const qrCodeBase64 = await QRCode.toDataURL(qrCodeData);
    console.log("Generated QR Code Base64:", qrCodeBase64);
    return true;
  } catch (error) {
    console.error("Error generating QR Code:", error);
    return false;
  }
};

const getCode = generateQRCode("6667c342d5d36503aebb520b");
