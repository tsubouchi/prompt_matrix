# Prompt Matrix

プロンプトテンプレート管理アプリケーション

## 概要

Prompt Matrixは、AIプロンプトのテンプレートを作成、管理、共有するためのWebアプリケーションです。

## 技術スタック

- **フレームワーク**: Next.js 14.2.18
- **UI ライブラリ**: React 18.3.1
- **スタイリング**: Tailwind CSS
- **コンポーネント**: Radix UI, shadcn/ui
- **フォーム管理**: React Hook Form + Zod
- **アイコン**: Lucide React

## セットアップ

### 前提条件

- Node.js 18以上
- pnpm（推奨）またはnpm

### インストール

```bash
# リポジトリをクローン
git clone [repository-url]
cd prompt_matrix

# 依存関係をインストール
pnpm install
# または
npm install
```

### 環境変数

`.env.local`ファイルを作成し、必要な環境変数を設定してください：

```bash
# .env.localの例は.env.local.sampleを参照
cp .env.local.sample .env.local
```

必要な環境変数：
- `GEMINI_API_KEY`: Google Gemini APIキー

### 開発サーバーの起動

```bash
pnpm dev
# または
npm run dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で起動します。

## プロジェクト構造

```
prompt_matrix/
├── app/                    # Next.js App Router
│   ├── create/            # プロンプト作成ページ
│   ├── prompt/[id]/       # プロンプト詳細ページ
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/uiコンポーネント
│   └── chat-bot.tsx      # チャットボットコンポーネント
├── styles/               # グローバルスタイル
└── public/              # 静的ファイル
```

## ビルド

```bash
pnpm build
# または
npm run build
```

## デプロイ

このプロジェクトはVercelでのデプロイに最適化されています。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/prompt_matrix)

## ライセンス

[ライセンスを指定してください]
