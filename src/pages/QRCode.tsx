import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Download, Share2, Smartphone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const APP_URL = 'https://smart-mobile.lovable.app';

const QRCodePage = () => {
  const handleDownload = () => {
    const svg = document.querySelector('#app-qr-code svg') as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx?.fillRect(0, 0, 400, 400);
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 400, 400);
      }
      ctx?.drawImage(img, 0, 0, 400, 400);
      const link = document.createElement('a');
      link.download = 'mobilehub-qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('QR Code downloaded!');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MobileHub',
          text: 'Check out MobileHub - Premium Smartphones Store',
          url: APP_URL,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(APP_URL);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Smartphone className="w-4 h-4" />
                Scan & Shop
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                MobileHub QR Code
              </h1>
              <p className="text-muted-foreground">
                Scan this QR code to visit our store on any device
              </p>
            </div>

            <div
              id="app-qr-code"
              className="inline-block p-8 bg-white rounded-3xl shadow-2xl"
            >
              <QRCodeSVG
                value={APP_URL}
                size={256}
                level="H"
                includeMargin={false}
                fgColor="#000000"
                bgColor="#ffffff"
              />
              <p className="mt-4 text-sm font-semibold text-gray-700">
                smart-mobile.lovable.app
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Download QR Code
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Link
              </Button>
            </div>

            <div className="glass-card rounded-2xl p-6 text-left space-y-4">
              <h2 className="font-display text-xl font-semibold">Store Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">💳 Pay Online or Offline</div>
                <div className="flex items-center gap-2">🚚 Fast Delivery</div>
                <div className="flex items-center gap-2">⭐ Rating & Reviews</div>
                <div className="flex items-center gap-2">🏷️ Exclusive Discounts</div>
                <div className="flex items-center gap-2">✅ Quality Assured</div>
                <div className="flex items-center gap-2">📦 Track Quantity & Stock</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QRCodePage;
