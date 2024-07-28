#!/bin/bash

cd server
echo "Setting up virtual environment in server directory..."
python3 -m venv venv
echo "Activating virtual environment..."
source venv/bin/activate
echo "Installing Python packages from requirements.txt..."
pip install -r requirements.txt
echo "Running the server..."
python3 main.py
