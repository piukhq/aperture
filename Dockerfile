FROM node:latest as build
WORKDIR /app
ADD . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/out/ .
