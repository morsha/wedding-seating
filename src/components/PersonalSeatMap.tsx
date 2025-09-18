import React from 'react';
import type { Guest } from '../types';

interface PersonalSeatMapProps {
  guest: Guest;
  guests: Guest[];
  className?: string;
}

const PersonalSeatMap: React.FC<PersonalSeatMapProps> = ({ guest, guests, className = '' }) => {
  // 按桌號分組賓客
  const guestsByTable = guests.reduce((acc, g) => {
    if (!acc[g.tableNumber]) {
      acc[g.tableNumber] = [];
    }
    acc[g.tableNumber].push(g);
    return acc;
  }, {} as Record<string, Guest[]>);

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
      <h3 className="text-center font-medium mb-4 px-4 pt-4">座位地圖</h3>

      <div className="p-2 sm:p-6">
        {/* 新人主桌 */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* 新郎座位 */}
            <div className="w-12 h-8 sm:w-16 sm:h-10 border border-yellow-400 bg-yellow-100 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-yellow-800">
              新郎
            </div>

            {/* 水平橫桌 */}
            <div className={`w-16 h-10 sm:w-24 sm:h-12 border-2 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm ${
              guest.tableNumber === '主桌'
                ? 'bg-red-500 border-red-600 text-white'
                : 'bg-amber-200 border-amber-400'
            }`}>
              主桌
            </div>

            {/* 新娘座位 */}
            <div className="w-12 h-8 sm:w-16 sm:h-10 border border-yellow-400 bg-yellow-100 rounded flex items-center justify-center text-xs sm:text-sm font-bold text-yellow-800">
              新娘
            </div>
          </div>
        </div>

        {/* 手機版：響應式布局 */}
        <div className="block sm:hidden">
          <div className="flex justify-center gap-3">
            {availableColumns.filter(col => col !== '主桌').map((prefix) => (
              <div key={prefix} className={`flex flex-col ${prefix === '3' ? 'ml-4' : ''}`} style={{ flex: '1', maxWidth: '22%' }}>
                {tableGroups[prefix].map((tableNumber, tableIndex) => {
                  const prevTableNumber = tableIndex > 0 ? tableGroups[prefix][tableIndex - 1] : null;
                  const needsAisleBefore = prevTableNumber && prevTableNumber.endsWith('-5');
                  const isGuestTable = tableNumber === guest.tableNumber;

                  return (
                    <div key={tableNumber} className={`flex items-center justify-center ${
                      tableIndex > 0 ? (needsAisleBefore ? 'mt-4' : 'mt-1') : ''
                    }`}>
                      {/* 桌子 */}
                      <div className={`w-full h-8 border border-gray-400 rounded flex items-center justify-center font-bold text-xs ${
                        isGuestTable
                          ? 'bg-red-500 border-red-600 text-white'
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                      }`} style={{ minHeight: '32px', fontSize: '10px' }}>
                        <span>{tableNumber}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* 桌面版：水平排列 */}
        <div className="hidden sm:block">
          <div className="flex justify-center gap-6">
            {availableColumns.filter(col => col !== '主桌').map((prefix) => (
              <div key={prefix} className={`flex flex-col ${prefix === '3' ? 'ml-8' : ''}`}>
                {tableGroups[prefix].map((tableNumber, tableIndex) => {
                  const prevTableNumber = tableIndex > 0 ? tableGroups[prefix][tableIndex - 1] : null;
                  const needsAisleBefore = prevTableNumber && prevTableNumber.endsWith('-5');
                  const isGuestTable = tableNumber === guest.tableNumber;

                  return (
                    <div key={tableNumber} className={`flex items-center justify-center ${
                      tableIndex > 0 ? (needsAisleBefore ? 'mt-6' : 'mt-2') : ''
                    }`}>
                      {/* 桌子 */}
                      <div className={`w-16 h-10 border-2 rounded-lg flex items-center justify-center font-bold text-sm ${
                        isGuestTable
                          ? 'bg-red-500 border-red-600 text-white'
                          : 'bg-gray-100 border-gray-300 text-gray-700'
                      }`}>
                        {tableNumber}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSeatMap;
