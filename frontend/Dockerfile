# Builder
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# NGINX para servir os arquivos estáticos
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
