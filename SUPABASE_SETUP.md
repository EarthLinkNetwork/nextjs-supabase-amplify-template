# Supabase セットアップガイド

このプロジェクトをSupabaseと連携させるための手順です。

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの設定から以下の情報を取得：
   - Project URL
   - Anon Key
   - Service Role Key（オプション）

## 2. 環境変数の設定

`.env.local`ファイルを編集して、実際の値を設定してください：

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. データベーススキーマの作成

Supabaseダッシュボードの「SQL Editor」で、`supabase/schema.sql`の内容を実行してください。

または、Supabase CLIを使用している場合：

```bash
supabase db push
```

## 4. ストレージの設定（画像アップロード用）

1. Supabaseダッシュボードの「Storage」セクションへ移動
2. 新しいバケットを作成：
   - バケット名: `stuffed-animals`
   - 公開バケット: ON
3. バケットのポリシーを設定（RLS）

## 5. 認証の設定

1. Supabaseダッシュボードの「Authentication」セクションへ移動
2. 「Providers」で必要な認証プロバイダーを有効化
3. 「Email Templates」でメールテンプレートをカスタマイズ（オプション）

## 6. アプリケーションの起動

```bash
npm install
npm run dev
```

## トラブルシューティング

### 認証エラーが発生する場合
- 環境変数が正しく設定されているか確認
- Supabaseプロジェクトの認証設定を確認

### データベースエラーが発生する場合
- スキーマが正しく作成されているか確認
- RLSポリシーが適切に設定されているか確認

### CORS エラーが発生する場合
- Supabaseダッシュボードで許可されたURLを確認
- ローカル開発の場合は`http://localhost:3000`を追加