FROM node:16-alpine
WORKDIR /backendUrlShortener
COPY . .
RUN npm install 
ENV HOST default   
EXPOSE 3000
CMD ["npm","start"]