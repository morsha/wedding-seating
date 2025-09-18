import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useGuestData } from '../hooks/useGuestData';
import { useAdminMode } from '../hooks/useAdminMode';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, reload } = useGuestData();
  const {
    isAdminMode,
    handleTitleClick
  } = useAdminMode();

  const handleSideSelect = (side: '男方' | '女方') => {
    navigate(`/category?side=${side}`);
  };

  const handleAdminAccess = () => {
    navigate('/fullmap');
  };

  const goHome = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner message="正在載入賓客資料..." />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-gray-800"
            onClick={handleTitleClick}
          >
            你是男方親友還是女方親友？
          </h1>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSideSelect('男方')}
            className={`w-full ${isAdminMode ? 'bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'} font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md`}
          >
            男方親友
          </button>

          <button
            onClick={() => handleSideSelect('女方')}
            className={`w-full ${isAdminMode ? 'bg-pink-500 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white transform hover:scale-105'} font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md`}
          >
            女方親友
          </button>
        </div>

        {/* 管理功能 */}
        {isAdminMode && (
          <div className="mt-8 pt-4 border-t border-gray-200 space-y-3">
            <button
              onClick={handleAdminAccess}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md"
            >
              🗺️ 檢視全地圖
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default HomePage;
