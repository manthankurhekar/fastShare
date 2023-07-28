# Expose port 3000
EXPOSE 3000

# Set working directory
WORKDIR /

# Copy package.json and package-lock.json to working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code to working directory
COPY . .

# Start server
CMD ["node", "server.js"]