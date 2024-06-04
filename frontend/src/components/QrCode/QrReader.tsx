import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import { useEffect, useRef, useState } from "react";

const QrReader = () => {
  // QR Sates
  const scanner = useRef<QrScanner>();
  const videoEL = useRef<HTMLVideoElement>(null);
  const qrBoxEL = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Scanner
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    // Handle success
    setScannedResult(result?.data);
  };
  // Handle fail
  const onScanFail = (error: string | Error) => {
    console.log(error);
  };

  useEffect(() => {
    if (videoEL?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEL?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // environment: back camera, user: front camera
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEL?.current || undefined,
      });
      // Start Qr Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((error) => {
          if (error) {
            setQrOn(false);
          }
        });
    }
    // This will remove the QR Scanner from rendering and using camera when it is closed or removed from the UI
    return () => {
      if (!videoEL?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // Handle when camera is not allowed in users' computer
  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser",
      );
    }
  }, [qrOn]);
  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEL}></video>
      <div ref={qrBoxEL} className="qr-box">
        <img
          src={QrFrame}
          alt="QR Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>

      {/* Show data result if scanned is success */}
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
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
