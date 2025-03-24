FROM node:23-alpine

WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json ./
# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3080

# Start the application
CMD ["npm", "run", "preview"]
