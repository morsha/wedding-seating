import type { Guest } from '../types';

export const parseCSV = (csvText: string): Guest[] => {
  const lines = csvText.trim().split('\n');
  const guests: Guest[] = [];
  
  // 跳過標題行，從第二行開始解析
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const [name, tableNumber, side, category] = line.split(',');
    
    if (name && tableNumber && side && category) {
      guests.push({
        name: name.trim(),
        tableNumber: tableNumber.trim(),
        side: side.trim() as '男方' | '女方',
        category: category.trim()
      });
    }
  }
  
  return guests;
};

export const getUniqueCategories = (guests: Guest[], side: '男方' | '女方'): string[] => {
  const categories = guests
    .filter(guest => guest.side === side)
    .map(guest => guest.category);
  
  return [...new Set(categories)].sort();
};

export const getGuestsByCategory = (guests: Guest[], side: '男方' | '女方', category: string): Guest[] => {
  return guests.filter(guest => 
    guest.side === side && guest.category === category
  );
};

export const findGuestByName = (guests: Guest[], name: string): Guest | undefined => {
  return guests.find(guest => guest.name === name);
};