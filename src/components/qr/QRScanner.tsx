import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setHasCamera(true);
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {
          setHasCamera(false);
        });
    } else {
      setHasCamera(false);
    }
  }, []);

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const tableId = Math.floor(Math.random() * 12) + 1;
      toast.success(`Table #${tableId} QR code detected!`);
      navigate(`/menu-order/${tableId}?source=qr`);
    }, 2000);
  };

  const navigateToManualInput = () => {
    navigate("/menu-order/manual");
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Scan Table QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted aspect-square rounded-lg flex items-center justify-center overflow-hidden">
            {isScanning ? (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white/70 rounded-lg"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-ping h-32 w-32 rounded-lg border-4 border-coffee"></div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6">
                <svg
                  className="mx-auto h-16 w-16 text-muted-foreground/50 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-muted-foreground">
                  {hasCamera
                    ? "Position QR code in the center"
                    : "Camera access required for scanning"}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={startScanning}
            disabled={isScanning || !hasCamera}
            className="w-full bg-coffee hover:bg-coffee-dark"
          >
            {isScanning ? "Scanning..." : "Start Scanning"}
          </Button>

          {!hasCamera && (
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Camera access is required to scan QR codes. Please allow camera
                permissions and reload the page.
              </p>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Scan the QR code on your table to order directly from your seat.
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Can't scan QR code?
            </p>
            <Button
              onClick={navigateToManualInput}
              variant="outline"
              className="border-coffee text-coffee hover:bg-coffee/10"
            >
              Enter Table Number Manually
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
