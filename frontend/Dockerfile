# Stage 1: Base & Dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Development (Digunakan oleh docker-compose untuk development lokal)
FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# Stage 3: Builder untuk production build
FROM base AS builder
COPY . .
RUN npm run build

# Stage 4: Production Web Server (Nginx)
FROM nginx:1.28-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 3000
CMD ["nginx", "-g", "daemon off;"]
