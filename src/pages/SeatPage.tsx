import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGuestData } from '../hooks/useGuestData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Breadcrumb from '../components/Breadcrumb';
import PersonalSeatMap from '../components/PersonalSeatMap';

const SeatPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('name');
  const side = searchParams.get('side');
  const category = searchParams.get('category');

  const { guests, loading, error, reload } = useGuestData();

  const guest = guests.find(g => g.name === guestName);

  if (!guestName || !guest) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  const goHome = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner message="正在載入座位資訊..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={reload}
        onGoHome={goHome}
      />
    );
  }

  const breadcrumbItems = [
    { label: '選擇方別', path: '/' },
    { label: `${guest.side}親友類別`, path: `/category?side=${side}` },
    { label: guest.category, path: `/names?side=${side}&category=${encodeURIComponent(category || '')}` },
    { label: guest.name }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Breadcrumb items={breadcrumbItems} />

          {/* 賓客資訊 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {guest.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {guest.side} · {guest.category}
            </p>

            <div className="inline-flex items-center justify-center bg-red-500 text-white rounded-full w-24 h-24 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{guest.tableNumber}</div>
                <div className="text-xs">桌號</div>
              </div>
            </div>
          </div>

          {/* 座位地圖 */}
          <PersonalSeatMap guest={guest} className="mb-6" />

          {/* 操作按鈕 */}
          <div className="flex space-x-4">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              重新查詢
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPage;
