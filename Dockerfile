FROM node:18-slim
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./server
COPY public/ ./public
COPY GAMES.json ./
EXPOSE 3000
CMD ["node", "server/index.js"]
