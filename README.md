# 婚禮座位查詢系統 💒

一個簡潔易用的婚禮座位查詢靜態網站，讓賓客能快速找到自己的座位。

## ✨ 功能特色

- 📱 **響應式設計** - 支援手機、平板、桌面所有裝置
- 🔍 **分類查詢** - 按方別和關係分類查詢座位
- 🗺️ **視覺化地圖** - 清晰的座位地圖顯示
- 👨‍💼 **管理功能** - 隱藏的管理員工具
- 📊 **資料匯出** - 支援 CSV/JSON 格式匯出
- 📱 **QR Code** - 自動生成分享用 QR Code
- 🖨️ **列印友善** - 優化的列印樣式

## 🚀 快速開始

### 線上使用

直接訪問：[https://yourusername.github.io/wedding-seating/](https://yourusername.github.io/wedding-seating/)

### 本地開發

1. 克隆專案
   ```bash
   git clone https://github.com/yourusername/wedding-seating.git
   cd wedding-seating
   ```

2. 安裝依賴
   ```bash
   npm install
   ```

3. 啟動開發伺服器
   ```bash
   npm run dev
   ```

4. 開啟瀏覽器訪問 `http://localhost:5173`

## 📊 資料格式

將賓客資料放在 `public/wedding-seat.csv`，格式如下：

```csv
名字,桌號,哪方親友,親友種類
張三,1-1,男方,家人
李四,1-2,女方,大學
```

## 🔧 自訂配置

### 修改座位配置

在 `src/utils/tableUtils.ts` 中調整桌次配置：

```typescript
// 修改桌次數量或跳過規則
for (let col = 1; col <= 5; col++) {
  for (let row = 1; row <= 8; row++) {
    if (col === 4 || row === 4) continue; // 跳過含4的桌號
    // ...
  }
}
```

### 自訂樣式

在 `tailwind.config.js` 中修改主題色彩：

```javascript
theme: {
  extend: {
    colors: {
      wedding: {
        blue: '#3b82f6',
        pink: '#ec4899',
      }
    }
  }
}
```

## 🚀 部署

### 自動部署

推送到 main 分支即可自動部署到 GitHub Pages。

### 手動部署

```bash
npm run build
npm run deploy
```

## 🛠️ 技術架構

- **前端框架**: React 18 + TypeScript
- **路由**: React Router
- **樣式**: Tailwind CSS
- **建置工具**: Vite
- **部署**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📱 管理功能

1. 在首頁標題連續點擊 5 次啟用管理模式
2. 可檢視全地圖、匯出資料、生成 QR Code
3. 管理狀態會保存在本地

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

感謝所有使用和貢獻這個專案的朋友們！
