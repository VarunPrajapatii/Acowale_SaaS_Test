# Backend Dockerfile (backend/Dockerfile)
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Install Prisma globally
RUN npm install -g prisma

# Ensure the prisma schema is available before running migrations and generating the client
COPY prisma ./prisma

# Set environment variables placeholder (they will be set externally)
# The user needs to provide these environment variables when running the container
ENV DATABASE_URL=placeholder_db_url
ENV JWT_SECRET=placeholder_secret
ENV PORT=3001

# Run Prisma migrations and generate Prisma client
RUN npx prisma migrate dev --name init
RUN npx prisma generate

# Expose backend port
EXPOSE 3001

# Command to start the backend
CMD ["node", "app.js"]
