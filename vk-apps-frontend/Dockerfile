FROM node:alpine

RUN mkdir -p /opt/services/vk-apps-frontend
WORKDIR /opt/services/vk-apps-frontend

COPY package.json package-lock.json ./
RUN npm install --silent

COPY . ./
RUN npm run build
