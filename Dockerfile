FROM node:17

WORKDIR /app
ADD . .

RUN yarn install --frozen-lockfile

ENTRYPOINT [ "yarn", "dev" ]
