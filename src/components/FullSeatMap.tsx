import React from 'react';
import type { Guest } from '../types';

interface FullSeatMapProps {
  guests: Guest[];
  className?: string;
}

const FullSeatMap: React.FC<FullSeatMapProps> = ({ guests, className = '' }) => {
  // 按桌號分組賓客
  const guestsByTable = guests.reduce((acc, guest) => {
    if (!acc[guest.tableNumber]) {
      acc[guest.tableNumber] = [];
    }
    acc[guest.tableNumber].push(guest);
    return acc;
  }, {} as Record<string, Guest[]>);


  // 特殊空座設定
  const emptySeats: Record<string, number[]> = {
    '1-3': [0], // 第一個位置空著
    '1-6': [2], // 第三個位置空著
    '1-7': [3], // 第四個位置空著
    '2-3': [3], // 第四個位置空著
    '5-1': [5], // 第六個位置空著
  };

  // 桌子座位排列函數 (左3右3)
  const arrangeSeats = (tableGuests: Guest[], tableNumber: string) => {
    const seats = Array(6).fill(null); // 6個座位
    const emptyPositions = emptySeats[tableNumber] || [];

    let guestIndex = 0;

    // 安排座位，跳過指定的空位
    for (let seatIndex = 0; seatIndex < 6; seatIndex++) {
      if (emptyPositions.includes(seatIndex)) {
        // 這個位置要空著
        seats[seatIndex] = null;
      } else if (guestIndex < tableGuests.length) {
        // 安排賓客
        seats[seatIndex] = tableGuests[guestIndex];
        guestIndex++;
      }
    }

    return {
      left: [seats[0], seats[1], seats[2]],
      right: [seats[3], seats[4], seats[5]]
    };
  };

  // 按桌號前綴分組
  const groupTablesByPrefix = () => {
    const groups: Record<string, string[]> = {};
    
    Object.keys(guestsByTable).forEach(tableNumber => {
      if (tableNumber === '主桌') {
        if (!groups['主桌']) groups['主桌'] = [];
        groups['主桌'].push(tableNumber);
      } else {
        const prefix = tableNumber.split('-')[0];
        if (!groups[prefix]) groups[prefix] = [];
        groups[prefix].push(tableNumber);
      }
    });

    // 對每組內的桌號排序
    Object.keys(groups).forEach(prefix => {
      groups[prefix].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    });

    return groups;
  };

  const tableGroups = groupTablesByPrefix();
  
  // 確定列的順序：主桌, 1, 2, 3, 5
  const columnOrder = ['主桌', '1', '2', '3', '5'];
  const availableColumns = columnOrder.filter(col => tableGroups[col] && tableGroups[col].length > 0);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* 新人主桌 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {/* 新郎座位 */}
            <div className="w-20 h-12 border-2 border-yellow-400 bg-yellow-100 rounded flex items-center justify-center text-sm font-bold text-yellow-800">
              新郎
            </div>
            
            {/* 水平橫桌 */}
            <div className="w-32 h-16 bg-amber-200 border-2 border-amber-400 rounded-lg flex items-center justify-center font-bold text-sm">
              主桌
            </div>
            
            {/* 新娘座位 */}
            <div className="w-20 h-12 border-2 border-yellow-400 bg-yellow-100 rounded flex items-center justify-center text-sm font-bold text-yellow-800">
              新娘
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          {availableColumns.map((prefix, columnIndex) => (
            <div key={prefix} className={`flex flex-col ${
              // column 2 和 column 3 之間（2-x 和 3-x 之間）增加走道
              columnIndex === 2 ? 'ml-16' : columnIndex > 0 ? 'ml-8' : ''
            }`}>
              {tableGroups[prefix].map((tableNumber, tableIndex) => {
                const tableGuests = guestsByTable[tableNumber];
                const { left, right } = arrangeSeats(tableGuests, tableNumber);
                
                // 檢查前一個桌子是否是 x-5，如果是則增加走道空間
                const prevTableNumber = tableIndex > 0 ? tableGroups[prefix][tableIndex - 1] : null;
                const needsAisleBefore = prevTableNumber && prevTableNumber.endsWith('-5'); // row 5 和 row 6 之間

                return (
                  <div key={tableNumber} className={`flex flex-col items-center ${
                    tableIndex > 0 ? (needsAisleBefore ? 'mt-8' : 'mt-1') : ''
                  }`}>
                    <div className="grid grid-cols-3 gap-2">
                      {/* 左側座位 */}
                      <div className="space-y-1">
                        {left.map((guest, index) => (
                          <div
                            key={index}
                            className={`w-16 h-8 border rounded flex items-center justify-center text-xs ${
                              guest
                                ? 'border-gray-400 bg-gray-50'
                                : 'border-dashed border-gray-300 bg-gray-100 text-gray-400'
                            }`}
                          >
                            {guest ? guest.name : '空'}
                          </div>
                        ))}
                      </div>

                      {/* 中間桌子 */}
                      <div className="flex items-center justify-center">
                        <div className={`w-12 h-24 border-2 rounded-lg flex items-center justify-center font-bold text-xs ${
                          // 1-1~1-8, 2-1~2-5 藍色，其他粉紅色
                          (tableNumber.startsWith('1-') || (tableNumber.startsWith('2-') && ['2-1', '2-2', '2-3', '2-5'].includes(tableNumber)))
                            ? 'bg-blue-200 border-blue-400 text-blue-800'
                            : 'bg-pink-200 border-pink-400 text-pink-800'
                        }`}>
                          {tableNumber}
                        </div>
                      </div>

                      {/* 右側座位 */}
                      <div className="space-y-1">
                        {right.map((guest, index) => (
                          <div
                            key={index}
                            className={`w-16 h-8 border rounded flex items-center justify-center text-xs ${
                              guest
                                ? 'border-gray-400 bg-gray-50'
                                : 'border-dashed border-gray-300 bg-gray-100 text-gray-400'
                            }`}
                          >
                            {guest ? guest.name : '空'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullSeatMap;
