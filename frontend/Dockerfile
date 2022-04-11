### STAGE 1: Build ###
FROM node:16-alpine AS node
WORKDIR /app
COPY . .
RUN yarn install
ENV REACT_APP_BACKEND_URL https://pokedex-backend-mlsdj2uhea-uc.a.run.app
RUN yarn build

### STAGE 2: Run ###
FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/build/ /usr/share/nginx/html
EXPOSE 80