import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import Order from "../../../../backend/src/models/order"; // Adjust the import path accordingly

const QrReader: React.FC = () => {
  const scanner = useRef<QrScanner | null>(null); // Ref for QrScanner instance
  const videoEL = useRef<HTMLVideoElement>(null); // Ref for video element
  const qrBoxEL = useRef<HTMLDivElement>(null); // Ref for QR box element
  const [qrOn, setQrOn] = useState<boolean>(true); // State for QR scanner status
  const [scannedResult, setScannedResult] = useState<string | undefined>(""); // State for scanned QR result

  // Function to handle successful QR scan
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    const qrCodeId = result.data;
    console.log(`Scan QR ID: ${qrCodeId}`);

    try {
      const order = await Order.findOne({
        "events.tickets.ticketId": qrCodeId,
        paymentStatus: "completed",
      });

      if (!order) {
        throw new Error("Order not found or payment is not completed.");
      }

      const event = order.events.find((event) =>
        event.tickets.some((ticket) => ticket.ticketId.toString() === qrCodeId),
      );

      if (!event) {
        throw new Error("Event not found for the given QR code.");
      }

      const ticket = event.tickets.find(
        (ticket) => ticket.ticketId.toString() === qrCodeId,
      );

      if (!ticket) {
        throw new Error("Ticket not found for the given QR code.");
      }

      if (ticket.quantity <= 0) {
        throw new Error("No more tickets left to use");
      }

      ticket.quantity -= 1;

      await order.save();

      alert(
        `Ticket for event ${event.eventId} used successfully. Remaining quantity: ${ticket.quantity}`,
      );
      setScannedResult(qrCodeId);
    } catch (error: any) {
      console.error("Error handling QR scan:", error);
      alert(`Scan failed: ${error.message}`);
    }
  };

  // Function to handle failed QR scan
  const onScanFail = (error: string | Error) => {
    console.error("QR scan failed:", error);
  };

  useEffect(() => {
    if (videoEL.current && !scanner.current) {
      // Initialize QrScanner when video element is ready
      scanner.current = new QrScanner(videoEL.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment", // Set preferred camera type
        highlightScanRegion: true, // Highlight the QR code scan region
        highlightCodeOutline: true, // Highlight the QR code outline
        overlay: qrBoxEL.current || undefined, // Optional overlay for QR code scanning
      });

      // Start the QR scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((e) => {
          console.error("Failed to start QR scanner:", e);
          setQrOn(false);
        });
    }

    return () => {
      if (scanner.current) {
        scanner.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera access in your browser settings.",
      );
    }
  }, [qrOn]); // Dependency array ensures this effect runs whenever qrOn state changes

  return (
    <div className="qr-reader">
      <video ref={videoEL} />

      <div ref={qrBoxEL} className="qr-box">
        <img
          src={QrFrame}
          alt="QR Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QrReader;
