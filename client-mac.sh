#!/bin/bash
cd client
echo "Installing npm packages in client directory..."
npm install
echo "Starting client..."
npm run dev &
cd ..
