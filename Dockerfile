FROM node:16.13.0-alpine AS frontend-build
RUN mkdir -p /opt/app/frontend && chown node:node -R /opt/app
USER node
WORKDIR /opt/app/frontend
COPY --chown=node:node client/package.json client/package-lock.json ./
RUN npm ci
COPY --chown=node:node client/ ./
CMD ["npm", "run", "build"]
