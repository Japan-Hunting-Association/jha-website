FROM node:20-alpine
WORKDIR /app
COPY ./ /app
RUN npm ci
COPY . .
EXPOSE 4321