import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";
import { getOrderByQrCode, updateTicketUsed } from "@/services/api";
import { XCircle } from "lucide-react";

export interface QrCode {
  orderId: string;
  eventId: string;
  ticketId: string;
  index: number;
}

const QrReader = () => {
  const [scannedResult, setScannedResult] = useState<string>(""); // State for scanned QR result
  const [checkBox] = useState<boolean>(false);

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
          const order = await getOrderByQrCode(qrCode.orderId, qrCode.eventId);
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
    <div>
      <div>
        <h1 className=" flex justify-center text-4xl font-semibold mb-2 mt-16 text-lime-500">
          {" "}
          Scan Machine
        </h1>
        <div className="flex justify-center w-full mt-24">
          <Scanner
            onScan={onScanSuccess} // Called when QR code is scanned
            styles={{
              container: { width: 400, height: 100, position: "relative" },
              video: { width: 400, height: 400 },
            }}
            allowMultiple={true}
          />
        </div>
        <div className="flex justify-center items-center mt-96">
          {scannedResult === "Valid" ? (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checkBox}
                readOnly
                className="mr-2"
              />
              <span>Ticket Validated</span>
            </label>
          ) : (
            scannedResult === "Invalid" && (
              <div className="flex items-center space-x-2">
                <XCircle className="text-red-500" size={32} />
                <span>Invalid QR Code</span>
              </div>
            )
          )}
        </div>
        {scannedResult && (
          <div className="mt-4 flex justify-center">
            <pre>{JSON.stringify(scannedResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrReader;
