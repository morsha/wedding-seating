import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  url?: string;
  onClose: () => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  url = window.location.origin, 
  onClose 
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setLoading(true);
        const qrString = await QRCode.toDataURL(url, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrDataUrl(qrString);
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, [url]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'wedding-seating-qr.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">座位查詢 QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="text-center">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <img 
                src={qrDataUrl} 
                alt="QR Code" 
                className="mx-auto mb-4 border border-gray-200 rounded"
              />
              <p className="text-sm text-gray-600 mb-4">
                賓客可掃描此 QR Code 查詢座位
              </p>
              <p className="text-xs text-gray-500 mb-4 break-all">
                {url}
              </p>
            </>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
          >
            下載 QR Code
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;