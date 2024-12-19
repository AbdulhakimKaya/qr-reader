import './BarcodeReader.scss';
import React, { useState } from "react";
import Scanner from "react-qr-barcode-scanner";

const BarcodeReader: React.FC = () => {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
    const [isCopied, setIsCopied] = useState(false);

    const handleScan = (err: unknown, result: any) => {
        if (result) {
            setScannedData(result.getText());
            setIsCameraActive(false);
        }
        if (err) {
            console.error(err);
        }
    };

    const startScanning = () => {
        setScannedData(null);
        setIsCameraActive(true);
        setIsCopied(false);
    };

    const stopScanning = () => {
        setIsCameraActive(false);
    };

    const toggleCamera = () => {
        setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    };

    const copyToClipboard = () => {
        if (scannedData) {
            navigator.clipboard.writeText(scannedData)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch((err: any) => console.error("Kopyalama hatası:", err));
        }
    };

    return (
        <div className="barcode-reader">
            <h2>Barcode / QR Reader</h2>
            {isCameraActive ? (
                <div className="barcode-reader-scanner">
                    <div className="barcode-reader-scanner-camera">
                        <Scanner
                            onUpdate={handleScan}
                            facingMode={facingMode}
                        />
                    </div>
                    <div className="barcode-reader-scanner-buttons">
                        <button onClick={toggleCamera} className="barcode-reader-scanner-buttons-toggle">
                            Kamerayı Değiştir ({facingMode === "user" ? "Ön Kamera" : "Arka Kamera"})
                        </button>
                        <button onClick={stopScanning} className="barcode-reader-scanner-buttons-close">
                            Kamerayı Kapat
                        </button>
                    </div>
                </div>
            ) : (
                <div className="barcode-reader-button">
                    <button onClick={startScanning} className="barcode-reader-button-start">
                        QR / Barkod Oku
                    </button>
                </div>
            )}

            {scannedData && (
                <div className="barcode-reader-data">
                    <h4>Okunan Veri:</h4>
                    <p>{scannedData}</p>
                    <button onClick={copyToClipboard} className="barcode-reader-data-copy">
                        {isCopied ? "Kopyalandı!" : "Kopyala"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default BarcodeReader;
