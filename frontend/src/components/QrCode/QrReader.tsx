import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";
import { getOrderByQrCode, updateTicketUsed } from "@/services/api";
import axios from "axios";
import { useGetUserEvents } from "@/services/queries";
import { Frown, Loader2, ServerCrash } from "lucide-react";

export interface QrCode {
  orderId: string;
  eventId: string;
  ticketId: string;
  index: number;
}

const QrReader = () => {
  const [scannedResult, setScannedResult] = useState<string>("");

  const { data, isLoading, isError } = useGetUserEvents();
  console.log(data);
  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center min-h-[500px]">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading Your Orders
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center min-h-[500px]">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <div className="flex items-center gap-x-2">
          <p className="text-2xl text-zinc-500 dark:text-zinc-400">
            Look like you haven't created any events yet. Please create an event
            first.
          </p>
          <Frown color="red" className="h-8 w-8" />
        </div>
      </div>
    );
  }

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
      } catch (error) {
        toast.error("Invalid QR Codes. Please try again!");
        return;
      }

      const order = await getOrderByQrCode(qrCode.orderId, qrCode.eventId);
      if (!order) {
        toast.error("Order not found. Please try again.");
        return;
      }
      try {
        const response = await updateTicketUsed(qrCode);
        if (response) {
          toast.success(response?.message);
          setScannedResult("Verified");
        }
      } catch (error) {
        console.error("Error updating ticket used:", error);
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
          setScannedResult(error.response?.data.message);
        }
      }
    } else {
      toast.error("No QR code detected. Please try again.");
    }
    setTimeout(() => {
      setScannedResult("");
    }, 2000);
  };

  return (
    <div className="bg-white pt-4">
      <h1 className="text-center text-4xl font-bold">Scan Tickets</h1>
      <p className="text-center text-2xl">
        Use the scanner below to check in your attendees.
      </p>

      <div className="flex flex-col items-center mt-10">
        <div className="flex items-center gap-x-2 relative max-w-[300px] w-full">
          <h2 className="text-lg">Ticket Status: </h2>
          {scannedResult && (
            <h2
              className={`${scannedResult === "Verified" ? "text-green-500 font-bold" : "text-red-500 font-bold"}`}
            >
              {scannedResult}!
            </h2>
          )}
        </div>
        <Scanner
          onScan={onScanSuccess} // Called when QR code is scanned
          styles={{
            container: {
              width: 300,
              height: 300,
              position: "relative",
              marginTop: 20,
              marginBottom: 20,
            },
            video: {
              width: 300,
              height: 300,
            },
          }}
          allowMultiple={true}
          scanDelay={2000}
        />
      </div>
    </div>
  );
};

export default QrReader;
