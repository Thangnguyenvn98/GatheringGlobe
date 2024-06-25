import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";
import { getOrderByQrCode, updateTicketUsed } from "@/services/api";

export interface QrCode {
  orderId: string;
  eventId: string;
  ticketId: string;
  index: number;
}

const QrReader = () => {
  const [scannedResult, setScannedResult] = useState<string>(""); // State for scanned QR result

  // Function to handle successful QR scan
  const onScanSuccess = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const rawValue = detectedCodes[0].rawValue;
      let qrCode: QrCode;
      try {
        qrCode = JSON.parse(rawValue);
        console.log(qrCode);
        if (!qrCode.orderId) {
          toast.error("No order ID found in QR code. Please try again.");
        }
        try {
          const order = await getOrderByQrCode(qrCode.orderId);
          if (!order) {
            toast.error("Order not found. Please try again.");
            return;
          }

          const response = await updateTicketUsed(qrCode);
          if (response) {
            toast.success(response?.message);
            setScannedResult(response?.message);
          } else {
            toast.error("Error updating ticket. Please try again.");
          }
        } catch (error) {
          console.error("Error fetching order by QR code:", error);
          toast.error("QRCode is invalid ! Please try again.");
          setScannedResult("Invalid");
        }
      } catch (error) {
        console.error("Error fetching order by QR code:", error);
        toast.error("QRCode is invalid ! Please try again.");
        setScannedResult("Invalid");
      }
    } else {
      toast.error("No QR code detected. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <Scanner
        onScan={onScanSuccess} // Called when QR code is scanned
        styles={{
          container: { width: 600, height: 300, position: "relative" },
          video: { width: 600, height: 600 },
        }}
        allowMultiple={true}
      />
      {scannedResult && (
        <div>
          <h3>Scanned Result: </h3>
          <pre>{JSON.stringify(scannedResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QrReader;
