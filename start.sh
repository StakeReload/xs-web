#!/bin/bash

# Update and install dependencies
echo "Updating package lists..."
sudo apt update -y && sudo apt upgrade -y

# Install Git, Node.js, and npm
echo "Installing Git, Node.js, and npm..."
sudo apt install -y git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -y npm

# Verify installations
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo "Git version: $(git --version)"

# Clone the repository
REPO_URL="https://github.com/jlucus/StakeReloadXS.com.git"
CLONE_DIR="xs-web"

echo "Cloning repository from $REPO_URL..."
git clone $REPO_URL $CLONE_DIR
cd $CLONE_DIR 
npm install package
cd backend || exit

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Start the application
echo "Starting the application..."
npm start
