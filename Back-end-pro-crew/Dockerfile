FROM node:16.13.0-alpine
RUN mkdir -p /svr/app
WORKDIR /svr/app
COPY package.json .
COPY package-lock.json .
RUN npm i 
COPY . .
# Value set in .env file.
EXPOSE 8000
CMD ["npm", "run", "start:dev"]