# Use Node.js 20.15.0 as the base image
FROM node:20.15.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# TODO - use npm ci instead of npm install for a more reliable and faster installation of dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8081

# Command to run the application
CMD ["node", "server.js"]