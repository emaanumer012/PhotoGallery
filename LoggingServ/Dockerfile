FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3009
CMD ["node", "index.js"]