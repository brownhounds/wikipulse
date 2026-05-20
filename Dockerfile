FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM ghcr.io/brownhounds/go-static:latest
COPY --from=build /app/dist /app
ENV PORT=8090
ENV IS_SPA=false
ENV SPA_ENTRYPOINT=index.html
ENV STATIC_FOLDER=/app
ENV PUBLIC_PATH=/
EXPOSE 8090
