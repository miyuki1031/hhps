# ベースとなるNode.jsのイメージを指定（軽量なalpine版）
FROM node:24-alpine

# DBが起動するまで待機
RUN apk add --no-cache postgresql-client netcat-openbsd

# コンテナ内の作業ディレクトリを設定
# WORKDIR /app
WORKDIR /app

# 依存関係の定義ファイルをコピー(これらを利用して以下作業を行うため)
COPY package*.json ./
RUN npm install


# COPY prisma.config.ts ./
# COPY prisma ./prisma/
# 
# COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
# RUN chmod +x /usr/local/bin/entrypoint.sh
# 残りのソースコードをコピー
COPY . .
# 起動
# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# 
RUN npm run build

# CMD ["npm", "run", "start"]
# RUN npm run start とは書かない！
## そしてdocer-compose.prod.ymlに移行


CMD ["npm", "run", "dev"]