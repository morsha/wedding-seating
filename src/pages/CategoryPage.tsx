import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGuestData } from '../hooks/useGuestData';
import { useGuestFilter } from '../hooks/useGuestFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Breadcrumb from '../components/Breadcrumb';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const side = searchParams.get('side') as '男方' | '女方' | null;

  const { guests, loading, error, reload } = useGuestData();
  const { categories } = useGuestFilter(guests, side || undefined);

  if (!side || !['男方', '女方'].includes(side)) {
    navigate('/');
    return null;
  }

  const handleCategorySelect = (category: string) => {
    navigate(`/names?side=${side}&category=${encodeURIComponent(category)}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const goHome = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingSpinner message="正在載入分類資料..." />;
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
    { label: `${side}親友類別` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-xl font-bold text-center mb-6 text-gray-800">
          你和新{side === '男方' ? '郎' : '娘'}是什麼時期認識的/什麼關係
        </h1>

        <div className="space-y-3 mb-6">
          {categories.map(category => {
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-all duration-200 text-left border border-gray-200 hover:border-gray-300 group"
              >
                <div className="flex justify-between items-center">
                  <span className="group-hover:text-blue-600 transition-colors">{category}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleBack}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          返回上一頁
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
