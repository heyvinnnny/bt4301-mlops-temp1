# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Install build tools for TensorFlow.js Node bindings
RUN apt-get update && apt-get install -y python build-essential

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Rebuild the TensorFlow.js Node bindings for the current environment
RUN npm rebuild @tensorflow/tfjs-node --build-from-source

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on (if necessary)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
