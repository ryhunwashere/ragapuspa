# 1. Build stage
FROM oven/bun:1.3.13-alpine AS build-stage
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG S3_BUCKET=$S3_BUCKET
ARG S3_FOLDER_PREFIX=$S3_FOLDER_PREFIX
ARG S3_ENDPOINT=$S3_ENDPOINT
ARG S3_REGION=$S3_REGION
ARG S3_ACCESS_KEY=$S3_ACCESS_KEY
ARG S3_ACCESS_SECRET=$S3_ACCESS_SECRET

COPY . .
RUN bun run build

# 2. Deploy stage
FROM nginx:1.30.0-alpine3.23-slim AS deploy-stage

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]