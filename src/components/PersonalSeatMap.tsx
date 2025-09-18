import React from 'react';
import type { Guest } from '../types';
import { generateTablePositions, getSVGDimensions } from '../utils/tableUtils';

interface PersonalSeatMapProps {
  guest: Guest;
  className?: string;
}

const PersonalSeatMap: React.FC<PersonalSeatMapProps> = ({ guest, className = '' }) => {
  const tables = generateTablePositions();
  const { width, height } = getSVGDimensions();

  return (
    <div className={`bg-gray-100 rounded-lg p-4 ${className}`}>
      <h3 className="text-center font-medium mb-4">座位地圖</h3>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto border border-gray-300 rounded bg-white"
          style={{ aspectRatio: `${width}/${height}` }}
        >
          {/* 繪製所有桌子 */}
          {tables.map(table => {
            const isGuestTable = table.id === guest.tableNumber;

            return (
              <g key={table.id}>
                {/* 桌子形狀 */}
                <rect
                  x={table.x}
                  y={table.y}
                  width={table.width}
                  height={table.height}
                  fill={isGuestTable ? '#ef4444' : '#f3f4f6'}
                  stroke={isGuestTable ? '#dc2626' : '#d1d5db'}
                  strokeWidth={isGuestTable ? 3 : 1}
                  rx={8}
                  className="transition-all duration-300"
                />

                {/* 桌號 */}
                <text
                  x={table.x + table.width / 2}
                  y={table.y + table.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight={isGuestTable ? "bold" : "normal"}
                  fill={isGuestTable ? 'white' : '#374151'}
                >
                  {table.id}
                </text>

              </g>
            );
          })}
        </svg>
      </div>

    </div>
  );
};

export default PersonalSeatMap;
