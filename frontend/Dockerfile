FROM node:latest

RUN mkdir -p /opt/services/tutors-frontend
WORKDIR /opt/services/tutors-frontend

COPY package.json package-lock.json /opt/services/tutors-frontend/
RUN npm install --silent
# RUN npm install -g serve --silent

COPY . /opt/services/tutors-frontend/
CMD ["npm", "start"]
# CMD ["serve", "-s", "build", "-l", "3000"]
