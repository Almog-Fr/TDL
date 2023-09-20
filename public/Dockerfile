# Use an official Nginx runtime as a parent image
FROM nginx:latest

# Copy the contents of your front-end code to the default Nginx HTML directory
COPY ./public /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# The Nginx image automatically starts the Nginx server, so no need for CMD
