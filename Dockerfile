# escape=`

FROM node:16.8.0-alpine

RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .
# No linting, formatting or testing until we have restructured all our folders/files
# (to avoid conflicts between different versions of same packages located at different
# levels of the app)
# RUN npm run lint && npm run format -- --check `
#     && npm run test

CMD ["node", "server/index.js"]
