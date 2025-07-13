# FROM node:20

# # Install deps
# COPY package*.json ./
# RUN npm install

# # Copy rest of code
# WORKDIR /app
# COPY . .

# RUN npm install
# EXPOSE 5173
# CMD ["npm", "run", "dev", "--", "--host"]

FROM node:20

WORKDIR /app

# Copy package files and install deps first (better caching)
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Expose Vite + Vitest UI
EXPOSE 5173
EXPOSE 51999

# No CMD — define it per-service in docker-compose.yml
