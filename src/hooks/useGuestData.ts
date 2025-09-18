import { useState, useEffect } from 'react';
import type { Guest } from '../types';
import { parseCSV } from '../utils/csvParser';

interface UseGuestDataReturn {
  guests: Guest[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export const useGuestData = (): UseGuestDataReturn => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/wedding-seat.csv');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const parsedGuests = parseCSV(csvText);
      
      setGuests(parsedGuests);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error loading guest data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    guests,
    loading,
    error,
    reload: loadData
  };
};