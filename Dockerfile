# Base Image
FROM node:8-alpine

LABEL maintainer="Umar Ahmad"

# Create and specify the "working directory" for the rest of the Dockerfile
WORKDIR /usr/src/app

# Copy app to WORKDIR
COPY . .

# Install dependencies
RUN npm install

# Set environment to "development" by default
#ENV NODE_ENV "development"

# Allows port 5000 to be publicly available
EXPOSE 5000

CMD ["npm", "start"]
