# 1. ベースとなるNode.jsのイメージを指定（軽量なalpine版）
FROM node:20-alpine

# 2. コンテナ内の作業ディレクトリを設定
WORKDIR /app

# 3. 依存関係の定義ファイルをコピー
COPY package*.json ./

# 4. パッケージをインストール
# Celeronだとここが一番時間がかかるので、キャッシュを効かせます
RUN npm install

# 5. 残りのソースコードをコピー
COPY . .

# 6. Next.jsの開発用サーバーを起動
# 0.0.0.0を指定しないとDockerの外（ブラウザ）から見えないので注意
CMD ["npm", "run", "dev"]