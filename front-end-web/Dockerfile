FROM node:20

# Install deps
COPY package*.json ./
RUN npm install

# Copy rest of code
WORKDIR /app
COPY . .

RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
