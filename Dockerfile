
# Expose port 3000
EXPOSE 3000

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to working directory
COPY package*.json ./

# Install Node.js using the apt package manager (compatible with Ubuntu)
# Also, install npm (Node.js package manager)
# Fixed typo "npm" to "nodejs" in the install command
RUN apt-get update && apt-get install -y nodejs

# Install dependencies
RUN npm install

# Copy source code to working directory
COPY . .

# Start server
CMD ["node", "server.js"]
