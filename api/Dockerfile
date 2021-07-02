FROM node:14

WORKDIR /dalba-de/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run

EXPOSE 3000