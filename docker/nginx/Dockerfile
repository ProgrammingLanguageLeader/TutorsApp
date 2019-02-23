FROM node:alpine as builder
RUN mkdir /vk-apps-frontend
WORKDIR /vk-apps-frontend
COPY ./vk-apps-frontend/package.json /vk-apps-frontend/
RUN npm install --silent
COPY ./vk-apps-frontend /vk-apps-frontend
RUN npm run build

FROM nginx:alpine
COPY --from=builder ./vk-apps-frontend/build /opt/services/vk-apps-frontend/build
CMD ["nginx", "-g", "daemon off;"]