FROM node:24-alpine
WORKDIR /app

# Install the application dependencies
COPY package*.json ./
RUN npm ci

# Copy in the source code
COPY src ./src
EXPOSE 3000

USER node

CMD ["node", "src/server.js"]