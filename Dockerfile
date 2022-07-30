FROM node:18.7-slim

WORKDIR /usr/local/api-service

COPY package.json ./

COPY tsconfig.json ./

RUN npm install --loglevel verbose

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]