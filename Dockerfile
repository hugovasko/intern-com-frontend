FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Changed command for development
CMD ["npm", "run", "dev"]

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

# For production, you might want to use a static file server
CMD ["npm", "run", "preview"]