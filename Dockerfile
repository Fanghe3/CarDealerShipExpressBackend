FROM node:latest
WORKDIR /app
ENV PATH /app/nodes_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
CMD ["node", "server.js"]