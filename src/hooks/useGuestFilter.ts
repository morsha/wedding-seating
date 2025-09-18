import { useMemo } from 'react';
import type { Guest } from '../types';
import { getUniqueCategories, getGuestsByCategory } from '../utils/csvParser';

interface UseGuestFilterReturn {
  categories: string[];
  guestsByCategory: Guest[];
  getGuestsByName: (name: string) => Guest | undefined;
}

export const useGuestFilter = (
  guests: Guest[],
  selectedSide?: '男方' | '女方',
  selectedCategory?: string
): UseGuestFilterReturn => {
  const categories = useMemo(() => {
    if (!selectedSide) return [];
    return getUniqueCategories(guests, selectedSide);
  }, [guests, selectedSide]);

  const guestsByCategory = useMemo(() => {
    if (!selectedSide || !selectedCategory) return [];
    return getGuestsByCategory(guests, selectedSide, selectedCategory);
  }, [guests, selectedSide, selectedCategory]);

  const getGuestsByName = (name: string): Guest | undefined => {
    return guests.find(guest => guest.name === name);
  };

  return {
    categories,
    guestsByCategory,
    getGuestsByName
  };
};