export interface Guest {
  name: string;
  tableNumber: string;
  side: '男方' | '女方';
  category: string;
}

export interface TableInfo {
  number: string;
  guests: Guest[];
  position: { x: number; y: number };
}

export type GuestSide = '男方' | '女方';
export type GuestCategory = string;