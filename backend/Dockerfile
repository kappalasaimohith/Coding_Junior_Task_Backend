FROM docker:24-dind
# Install Node.js and dependencies
RUN apk add --no-cache \
    nodejs \
    npm \
    bash \
    sudo

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Use entrypoint script to start Docker daemon and application
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Entrypoint will start Docker daemon and then run the Node.js app
ENTRYPOINT ["/entrypoint.sh"]