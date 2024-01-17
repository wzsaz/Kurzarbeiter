# Stage 1: Build the Angular application
FROM node:21-alpine as build

RUN mkdir /employee-management-frontend
WORKDIR /employee-management-frontend

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY src src
COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .
RUN npm run ng build --prod

# Stage 2: Serve the application from Nginx
FROM nginx:1.17.1-alpine
COPY --from=build /employee-management-frontend/dist/kurzarbeiter/browser /usr/share/nginx/html
