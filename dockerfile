# 1. Build stage
FROM node:lts-slim AS build-stage
WORKDIR /app

COPY package.json ./
RUN npm i

ARG S3_BUCKET
ARG S3_FOLDER_PREFIX
ARG S3_ENDPOINT
ARG S3_REGION
ARG S3_ACCESS_KEY
ARG S3_ACCESS_SECRET
ARG CF_CLIENT_ID
ARG CF_CLIENT_SECRET

ENV S3_BUCKET=$S3_BUCKET
ENV S3_FOLDER_PREFIX=$S3_FOLDER_PREFIX
ENV S3_ENDPOINT=$S3_ENDPOINT
ENV S3_REGION=$S3_REGION
ENV S3_ACCESS_KEY=$S3_ACCESS_KEY
ENV S3_ACCESS_SECRET=$S3_ACCESS_SECRET
ENV CF_CLIENT_ID=$CF_CLIENT_ID
ENV CF_CLIENT_SECRET=$CF_CLIENT_SECRET

COPY . .
RUN npm run build


# 2. Deploy stage
FROM nginx:stable-alpine AS deploy-stage

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]