FROM node:10.15.3-alpine

ENV NODE_ENV production
ENV SERVICE_PORT 4000

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install && yarn global add typescript@3.6.4

COPY . .

EXPOSE 4000

RUN yarn build

CMD ["yarn", "prod"]