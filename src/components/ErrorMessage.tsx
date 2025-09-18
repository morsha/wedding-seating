import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onGoHome }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">發生錯誤</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              重試
            </button>
          )}
          
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              回到首頁
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;