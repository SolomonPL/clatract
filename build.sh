#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build server
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

echo "Build completed successfully!" 