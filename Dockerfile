FROM node:slim as deps
WORKDIR /app
COPY . .
ARG NEXT_PUBLIC_PORTAL_API_URL NEXT_PUBLIC_LOYALTY_API_URL NEXT_PUBLIC_ENV
RUN apt-get update
RUN apt-get install -y ca-certificates
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:slim as main
WORKDIR /app
COPY --from=deps /app/next.config.js /app/package.json ./
COPY --from=deps /app/public ./public/
COPY --from=deps /app/.next ./.next/
COPY --from=deps /app/playwright.config.ts ./
COPY --from=deps /app/e2e ./e2e/
COPY --from=deps /app/node_modules ./node_modules/
CMD ["yarn", "start"]

FROM main as playwright
RUN npx playwright install
RUN npx playwright install-deps
