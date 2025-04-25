#!/bin/bash

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Build server (for API support)
echo "Building server..."
cd server
npm install
npm run build
cd ..

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

# Ensure API folder exists
mkdir -p api

# Ensure we have the server.js in the api directory
if [ ! -f api/server.js ]; then
  echo "Creating API server file..."
  cp api/server.js api/server.js.bak 2>/dev/null || true
fi

echo "Build completed successfully!" 