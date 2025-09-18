export interface TablePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type?: 'main' | 'long' | 'round';
}

export interface VenueElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'stage' | 'buffet' | 'bar' | 'toilet' | 'entrance';
  label: string;
}

// 生成新的座位地圖配置
export const generateTablePositions = (): TablePosition[] => {
  const tables: TablePosition[] = [];
  const longTableWidth = 60; // 長桌寬度
  const longTableHeight = 40; // 長桌高度
  const mainTableWidth = 120; // 主桌寬度
  const mainTableHeight = 60; // 主桌高度

  // 布局配置
  const leftStartX = 120; // 左側桌子起始X (增加以避免與自助餐重疊)
  const tableStartY = 120; // 桌子起始Y (舞台下方)
  const rowGap = 50; // 行間距
  const colGap = 80; // 統一列間距
  const rightStartX = leftStartX + (longTableWidth + colGap) * 3; // 右側桌子起始X，保持一致間距

  // 主桌 (2-1和3-1正前方)
  const mainTableX = leftStartX + (longTableWidth + colGap) + (longTableWidth / 2) - (mainTableWidth / 2); // 2-1和3-1之間的中心位置
  tables.push({
    id: '主桌',
    x: mainTableX + 60,
    y: 20,
    width: mainTableWidth,
    height: mainTableHeight,
    type: 'main'
  });

  // 左側三列桌子 (1-x, 2-x, 3-x)
  for (let row = 1; row <= 8; row++) {
    // 跳過4號桌
    if (row === 4) continue;

    // 計算Y位置，在5和6之間加入走道空間
    let adjustedRow = row > 4 ? row - 1 : row;
    if (row >= 6) adjustedRow += 1; // 6,7,8號桌向下移一個位置 (走道空間)
    const y = tableStartY + (adjustedRow - 1) * rowGap;

    // 1-x 桌
    tables.push({
      id: `1-${row}`,
      x: leftStartX,
      y: y,
      width: longTableWidth,
      height: longTableHeight,
      type: 'long'
    });

    // 2-x 桌
    tables.push({
      id: `2-${row}`,
      x: leftStartX + (longTableWidth + colGap),
      y: y,
      width: longTableWidth,
      height: longTableHeight,
      type: 'long'
    });

    // 3-x 桌
    tables.push({
      id: `3-${row}`,
      x: leftStartX + (longTableWidth + colGap) * 2,
      y: y,
      width: longTableWidth,
      height: longTableHeight,
      type: 'long'
    });
  }

  // 右側5-x桌 (完整系列: 1,2,3,5,6,7,8 - 跳過5-4)
  for (let row = 1; row <= 8; row++) {
    // 跳過4號桌
    if (row === 4) continue;

    // 計算Y位置，在5和6之間加入走道空間
    let adjustedRow = row > 4 ? row - 1 : row;
    if (row >= 6) adjustedRow += 1; // 6,7,8號桌向下移一個位置 (走道空間)
    const y = tableStartY + (adjustedRow - 1) * rowGap;

    tables.push({
      id: `5-${row}`,
      x: rightStartX,
      y: y,
      width: longTableWidth,
      height: longTableHeight,
      type: 'long'
    });
  }

  return tables;
};

export const getTablePosition = (tableNumber: string): TablePosition | undefined => {
  const tables = generateTablePositions();
  return tables.find(table => table.id === tableNumber);
};

// 生成場地設施配置
export const generateVenueElements = (): VenueElement[] => {
  return [
    // 舞台 (頂部中央)
    {
      id: 'stage',
      x: 180,
      y: 20,
      width: 180,
      height: 40,
      type: 'stage',
      label: '舞台'
    },
    // 自助餐區 (左側垂直)
    {
      id: 'buffet',
      x: 20,
      y: 120,
      width: 80,
      height: 300,
      type: 'buffet',
      label: '自助餐'
    },
    // 廁所 (右側中間位置)
    {
      id: 'toilet',
      x: 620,
      y: 240,
      width: 60,
      height: 80,
      type: 'toilet',
      label: '廁所'
    },
    // 入口 (左下角)
    {
      id: 'entrance',
      x: 20,
      y: 450,
      width: 80,
      height: 40,
      type: 'entrance',
      label: '入口'
    },
    // 吧台 (底部橫向)
    {
      id: 'bar',
      x: 180,
      y: 500,
      width: 200,
      height: 40,
      type: 'bar',
      label: '吧台'
    }
  ];
};

// 計算SVG視窗大小
export const getSVGDimensions = () => {
  const tables = generateTablePositions();
  const venues = generateVenueElements();
  const allElements = [...tables, ...venues];

  const maxX = Math.max(...allElements.map(t => t.x + t.width));
  const maxY = Math.max(...allElements.map(t => t.y + t.height));

  return {
    width: maxX + 50, // 加上邊距
    height: maxY + 50
  };
};
