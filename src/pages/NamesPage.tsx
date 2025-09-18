import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGuestData } from '../hooks/useGuestData';
import { useGuestFilter } from '../hooks/useGuestFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Breadcrumb from '../components/Breadcrumb';

const NamesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const side = searchParams.get('side') as '男方' | '女方' | null;
  const category = searchParams.get('category');

  const { guests, loading, error, reload } = useGuestData();
  const { guestsByCategory } = useGuestFilter(guests, side || undefined, category || undefined);

  if (!side || !category) {
    navigate('/');
    return null;
  }

  const filteredGuests = guestsByCategory.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameSelect = (guestName: string) => {
    navigate(`/seat?side=${side}&category=${encodeURIComponent(category)}&name=${encodeURIComponent(guestName)}`);
  };

  const handleBack = () => {
    navigate(`/category?side=${side}`);
  };

  const goHome = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner message="正在載入賓客名單..." />;
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
    { label: `${side}親友類別`, path: `/category?side=${side}` },
    { label: `${category}` }
  ];

  return (
    <div className="h-screen bg-white py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="p-8">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="text-xl font-bold text-center mb-6 text-gray-800">
            你的大名是什麼
          </h1>

        {/* 搜尋框 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="搜尋姓名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* 賓客列表 */}
        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
          {filteredGuests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? `找不到包含 "${searchTerm}" 的姓名` : '沒有找到賓客'}
            </div>
          ) : (
            filteredGuests.map(guest => (
              <button
                key={guest.name}
                onClick={() => handleNameSelect(guest.name)}
                className="w-full bg-gray-50 hover:bg-blue-50 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-left border border-gray-200 hover:border-blue-300 group"
              >
                <div className="flex justify-between items-center">
                  <span className="group-hover:text-blue-600 transition-colors">{guest.name}</span>
                </div>
              </button>
            ))
          )}
        </div>

          <button
            onClick={handleBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            返回上一頁
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamesPage;
