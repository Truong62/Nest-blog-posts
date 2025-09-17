FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ===== STAGE 2 =====
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --production
RUN npm cache clean --force


EXPOSE 3000

CMD ["node", "dist/main"]