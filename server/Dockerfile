FROM node
WORKDIR /server
COPY package.json .
RUN npm install --production
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD [ "npm","run","start:prod" ]
