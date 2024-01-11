FROM node:16
WORKDIR /usr/src/app
COPY ./package.json ./package.json
COPY ./index.js ./index.js
COPY ./public ./public
COPY ./src ./src
RUN npm install -g nodemon
RUN npm install dotenv
EXPOSE 3000
CMD ["npm", "start"]