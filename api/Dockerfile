FROM node:lts-alpine

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE ${PORT}
CMD [ "node", "bin/www" ]
