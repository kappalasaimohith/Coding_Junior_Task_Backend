#!/bin/bash

# Start the Docker daemon
dockerd-entrypoint.sh &

# Wait for Docker to start
sleep 5

# Start the Node.js application
node server.js