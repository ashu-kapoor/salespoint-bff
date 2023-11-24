FROM node:18.6.0-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
#CMD ["npm","run", "start"]


## this is stage two , where the app actually runs
FROM node:18.6.0-alpine
COPY package.json /usr/package.json
COPY --from=0 /usr/dist /usr/dist
COPY --from=0 /usr/src /usr/src
WORKDIR /usr
RUN npm install --only=production
RUN npm install pm2 -g
#EXPOSE 4000
CMD ["pm2-runtime","dist/index.js"]
#CMD ["npm","run", "start"]