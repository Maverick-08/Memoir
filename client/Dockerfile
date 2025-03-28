# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:stable-alpine AS production

# Copy the built files from Stage 1 to NGINX's default HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration file if needed (see Step 3)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for external access
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]