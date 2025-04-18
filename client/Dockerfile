# Stage 1: Build the React app
FROM node:slim AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with 'serve'
FROM node:slim

WORKDIR /app

# Install 'serve' globally
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist ./build

EXPOSE 80

# Start the app using 'serve'
CMD ["serve", "-s", "build", "-l", "80"]
