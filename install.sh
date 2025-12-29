#!/bin/sh

echo "Installing app..."

echo "Installing backend"
cd Social-Cycling-Backend
npm i

cd ..

echo "Installing backend"
cd Social-Cycling-Frontend
npm i