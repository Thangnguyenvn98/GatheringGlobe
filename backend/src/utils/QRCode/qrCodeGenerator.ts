import qr from 'qrcode';
import fs from 'fs';

async function generateQRCode(data: string, filePath: string): Promise<string> {
  try {
    await qr.toFile(filePath, data);
    console.log('QR code generated successfully!');
    return filePath;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

// Example usage:
const qrCodeData: string = 'Your QR code data here';
const qrCodeFilePath: string = 'path/to/qr-code.png'; // Specify the file path where you want to save the QR code image
generateQRCode(qrCodeData, qrCodeFilePath);
