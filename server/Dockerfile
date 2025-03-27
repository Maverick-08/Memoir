FROM node:22-apline

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD [ "npm","run","start" ]