import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGuestData } from '../hooks/useGuestData';
import { useAdminMode } from '../hooks/useAdminMode';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import FullSeatMap from '../components/FullSeatMap';

const FullMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { guests, loading, error, reload } = useGuestData();
  const { isAdminMode, enableAdminMode } = useAdminMode();

  // 如果不是管理員模式，自動啟用（因為能進到這頁面表示已經通過驗證）
  React.useEffect(() => {
    if (!isAdminMode) {
      enableAdminMode();
    }
  }, [isAdminMode, enableAdminMode]);

  if (loading) {
    return <LoadingSpinner message="正在載入全座位地圖..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={reload}
        onGoHome={() => navigate('/')}
      />
    );
  }

  const handleBack = () => {
    navigate('/');
  };


  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 標題列 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">婚禮座位全地圖</h1>
            <p className="text-gray-600 mt-1">管理者檢視 - 所有賓客座位配置</p>
          </div>

          <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            返回首頁
          </button>
        </div>

        {/* 座位地圖 */}
        <FullSeatMap guests={guests} />
      </div>

    </div>
  );
};

export default FullMapPage;
