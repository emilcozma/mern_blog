FROM node:16
WORKDIR /usr/src/app
COPY ./package.json ./package.json
COPY ./public ./public
COPY ./src ./src
RUN npm install --silent
EXPOSE 8001
CMD ["npm", "start"]