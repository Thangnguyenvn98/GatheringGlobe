import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
// import Order from "../../../../backend/src/models/order";
import axios from "axios";
import toast from "react-hot-toast";

interface QrCode {
  orderId: string;
  eventId: string;
  ticketId: string;
  index: number;
}

const QrReader = () => {
  const [scannedResult, setScannedResult] = useState<
    IDetectedBarcode[] | undefined
  >(); // State for scanned QR result

  // Function to handle successful QR scan
  const onScanSuccess = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const qrCode = detectedCodes[0].rawValue as unknown as QrCode; // Get the raw value of the first detected QR code
      // const qrCodeId = qrCode.console.log(`Scan QR ID: ${qrCodeId}`);
      if (!qrCode.orderId) {
        toast.error("Invalid QR code");
      }
      const qrCodeId = qrCode.orderId;

      try {
        // const order = await Order.findOne({
        //   "events.tickets.ticketId": qrCodeId,
        //   paymentStatus: "completed",
        // });

        const response = await axios.get(`/api/orders/order-by-qr/${qrCodeId}`);
        const order = response.data;
        // Print the entire order response to inspect
        console.log("Order details:", order);

        if (!order) {
          throw new Error("Order not found or payment is not completed.");
        }

        const event = order.events.find((event: any) =>
          event.tickets.some(
            (ticket: any) => ticket.ticketId.toString() === qrCodeId,
          ),
        );

        if (!event) {
          throw new Error("Event not found for the given QR code.");
        }

        const ticket = event.tickets.find(
          (ticket: any) => ticket.ticketId.toString() === qrCodeId,
        );

        if (!ticket) {
          throw new Error("Ticket not found for the given QR code.");
        }

        if (ticket.quantity <= 0) {
          throw new Error("No more tickets left to use");
        }

        console.log(`Ticket Details: 
          Event ID: ${event.eventId._id}, 
          Ticket ID: ${ticket.ticketId._id}, 
          Remaining Quantity: ${ticket.quantity}`);

        ticket.quantity -= 1;

        // Backend endpoint to update the ticket quantity
        await axios.post(`/api/orders/update-ticket-quantity/${order._id}`, {
          eventId: event.eventId._id,
          ticketId: ticket.ticketId._id,
          quantity: ticket.quantity,
        });

        // await order.save();
        console.log("Done the scanning ngheeeeee");

        alert(
          `Ticket for event ${event.eventId} used successfully. Remaining quantity: ${ticket.quantity}`,
        );
        setScannedResult(detectedCodes);
      } catch (error: any) {
        console.error("Error handling QR scan:", error);
        alert(`Scan failed: ${error.message}`);
        console.log("hello bug here");
      }
    } else {
      console.log("No QR code here!!!!!");
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
        allowMultiple={false}
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
