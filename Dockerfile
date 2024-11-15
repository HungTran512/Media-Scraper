# Use the Node.js image as a base
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE ${PORT}

# Run the app
CMD ["npm", "run", "dev"]
