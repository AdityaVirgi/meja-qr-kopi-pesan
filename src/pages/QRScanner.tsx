
import Layout from "@/components/layout/Layout";
import QRScanner from "@/components/qr/QRScanner";

const QRScannerPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center text-coffee-dark">
          Scan Table QR Code
        </h1>
        <p className="text-center mb-8 text-muted-foreground">
          Scan the QR code on your table to start ordering
        </p>

        <QRScanner />
      </div>
    </Layout>
  );
};

export default QRScannerPage;
