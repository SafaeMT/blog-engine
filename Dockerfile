FROM node:16.13.0-alpine AS frontend-build
RUN mkdir -p /opt/app/frontend && chown node:node -R /opt/app
USER node
WORKDIR /opt/app/frontend
COPY --chown=node:node client/package*.json ./
RUN npm ci
COPY --chown=node:node client/ ./
RUN npm run build
CMD ["sh"]

FROM node:16.13.0-alpine AS backend
RUN mkdir -p /opt/app/backend && chown node:node -R /opt/app
USER node
WORKDIR /opt/app/backend
COPY --chown=node:node server/package*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node server/ ./
COPY --from=frontend-build /opt/app/frontend/build ./build
CMD ["node", "index.js"]
