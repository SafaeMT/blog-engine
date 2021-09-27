# escape=`

FROM node:16.8.0-alpine

RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .
# Catch syntax and coding style errors
RUN npm run lint && npm run format -- --check `
    && npm run test

CMD ["node", "server.js"]
