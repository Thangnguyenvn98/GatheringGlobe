const QrCodeGenerator = () => {
  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        <div className="qrcode__input">
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
        </div>
        {qrIsVisible && (
          <div className="qrcode__download">
            <div className="qrcode__image">
              <QRCode value={url} size={300} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default QrCodeGenerator;
