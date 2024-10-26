# Kindle Analytics Dashboard

## 概要
Kindleの読書データを視覚化・分析するダッシュボード。購入履歴、読書進捗、評価データを多角的に分析し、読書習慣の把握と改善をサポートします。

## 主な機能

### 1. 基本統計
- 総書籍数
- 読了率
- 平均評価
- 総支出額

### 2. トレンド分析
- 月別購入・読了推移
- カテゴリー分布
- 読了率の推移
- 評価の分布状況

### 3. 購入パターン
- 曜日別購入傾向
- 価格帯の分析
- カテゴリー別支出

## 技術スタック
- React + TypeScript
- Vite
- shadcn/ui
- Recharts
- TanStack Query

## セットアップ
```bash
# プロジェクトのクローン
git clone <repository-url>

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## データ連携
Google Sheets APIを使用してデータを取得します。

1. 環境変数の設定
```env
VITE_GOOGLE_API_KEY=your_api_key_here
```

2. スプレッドシートの形式
必要なカラム:
- 注文日
- 商品名
- 読了
- 評価
- 形式
- 価格円
- メインカテゴリ

## カスタマイズ
- `src/components/charts/`: グラフコンポーネント
- `src/components/insights/`: 分析コンポーネント
- `src/types/`: 型定義
- `src/lib/`: ユーティリティ関数

## ライセンス
MIT