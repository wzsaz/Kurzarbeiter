# Stage 1: Build the Angular application
FROM node:21-alpine as build
RUN mkdir /employee-management-frontend
WORKDIR /employee-management-frontend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run ng build --prod

# Stage 2: Serve the application from Nginx
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist /usr/share/nginx/htmly
