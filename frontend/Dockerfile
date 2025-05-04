FROM node:20.18.3-alpine-alpine as builder

WORKDIR /app

COPY ./package*json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx as final

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]