# Use an official Node.js runtime as a parent image
FROM node:14

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm-get update
RUN npm install
RUN npm install cors

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to start your Node.js application
CMD ["node", "server.js"]
