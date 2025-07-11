# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Asegura que dotenv esté instalado
RUN npm install dotenv

EXPOSE 4000

CMD ["node", "src/server.js"]
