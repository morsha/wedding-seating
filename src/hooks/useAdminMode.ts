import { useState, useEffect, useCallback } from 'react';

interface UseAdminModeReturn {
  isAdminMode: boolean;
  clickCount: number;
  handleTitleClick: () => void;
  enableAdminMode: () => void;
  disableAdminMode: () => void;
  resetClickCount: () => void;
}

const ADMIN_CLICK_THRESHOLD = 5;
const CLICK_RESET_TIMEOUT = 3000; // 3秒後重置點擊次數

export const useAdminMode = (): UseAdminModeReturn => {
  const [clickCount, setClickCount] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // 重置點擊次數的計時器
  useEffect(() => {
    if (clickCount > 0 && clickCount < ADMIN_CLICK_THRESHOLD) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, CLICK_RESET_TIMEOUT);

      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleTitleClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= ADMIN_CLICK_THRESHOLD) {
        setIsAdminMode(true);
        return 0; // 重置計數
      }
      return newCount;
    });
  }, []);

  const enableAdminMode = useCallback(() => {
    setIsAdminMode(true);
    setClickCount(0);
  }, []);

  const disableAdminMode = useCallback(() => {
    setIsAdminMode(false);
    setClickCount(0);
  }, []);

  const resetClickCount = useCallback(() => {
    setClickCount(0);
  }, []);

  return {
    isAdminMode,
    clickCount,
    handleTitleClick,
    enableAdminMode,
    disableAdminMode,
    resetClickCount
  };
};