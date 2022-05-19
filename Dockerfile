FROM node:slim as deps
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y ca-certificates
RUN yarn install --frozen-lockfile
RUN npx env-cmd -f .env.${ENVIRONMENT} yarn build

FROM node:slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/next.config.js /app/package.json ./
COPY --from=deps /app/public ./public/
COPY --from=deps /app/.next ./.next/
COPY --from=deps /app/node_modules ./node_modules/
CMD ["yarn", "start"]
