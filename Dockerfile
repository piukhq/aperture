FROM node:latest as build
WORKDIR /build
ADD . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine
COPY --from=build /build/build/server/pages /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]
