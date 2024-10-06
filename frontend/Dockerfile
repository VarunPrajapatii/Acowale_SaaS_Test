# Frontend Dockerfile (frontend/Dockerfile)
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Set environment variables (e.g., the backend URL to fetch data)
# Replace the placeholder URL with the actual backend URL you are using
ENV BACKEND_URL=http://localhost:3000

# Expose frontend port
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]
