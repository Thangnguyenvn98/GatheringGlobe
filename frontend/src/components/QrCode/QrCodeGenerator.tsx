import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import emailjs from "emailjs-com";

const QrCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const [qrIsVisible] = useState(false);
  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current as HTMLElement)
      .then(function (dataUrl) {
        sendEmail(dataUrl);
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };
  const handleQrCodeGenerator = () => {
    downloadQRCode();
  };
  const sendEmail = (qrCodeUrl: any) => {
    const templateParams = {
      to_email: email,
      qr_code_url: qrCodeUrl,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_USER_ID",
      )
      .then(
        (response: any) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error: any) => {
          console.error("FAILED...", error);
        },
      );
  };
  return (
    <div className="qrcode__container flex flex-col items-center justify-center w-full h-screen">
      <div className="bg-green-300 rounded py-2 px-4">
        <h1>QR Code Generator</h1>
      </div>
      <div
        className="qrcode__container--parent flex gap-2.5 items-center justify-center w-full"
        ref={qrCodeRef}
      >
        <div className="qrcode__input flex flex-col items-center w-3/10 mt-5">
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4"
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={handleQrCodeGenerator}
          >
            Generate QR Code
          </button>
        </div>
        {qrIsVisible && (
          <div className="qrcode__download inline-block px-2 py-1 cursor-pointer text-white bg-blue-500 border-none rounded font-medium text-xs transition-colors duration-200 hover:bg-blue-600">
            <div className="qrcode__image">
              <QRCode value={url} size={300} />
            </div>
            <button onClick={downloadQRCode}>Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default QrCodeGenerator;
