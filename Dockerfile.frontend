FROM node:18-alpine as builder

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY vite.config.js ./
COPY index.html ./
COPY eslint.config.js ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers
COPY . .

# En mode développement, on utilise Vite directement
CMD ["npm", "run", "dev", "--", "--host"]