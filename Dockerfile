FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "index.js", "./"]
RUN npm install
RUN ls -l ./
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
