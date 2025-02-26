FROM node:20.9-alpine

RUN apk add --no-cache curl
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5173

CMD ["npm","run","dev"]