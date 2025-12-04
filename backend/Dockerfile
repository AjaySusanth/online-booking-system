FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies (alpine friendly)
COPY package*.json ./
RUN npm install --production

# Copy backend source
COPY . .

# Expose backend port
EXPOSE 5000

CMD ["npm", "start"]
