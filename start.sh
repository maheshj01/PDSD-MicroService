#!/bin/bash

base="/Users/mahesh/Desktop/PDSD"

# mode is either start/dev default is start if no argument is passed
mode=${1:-start}


# Function to start the PostgreSQL database server
start_database() {
    echo "Starting PostgreSQL database server..."
    pg_ctl -D /opt/homebrew/var/postgresql@14 start
    sleep 2  # Wait for the database server to start (adjust as needed)
}

# Function to start a microservice
start_microservice() {
    local service_name=$1
    echo "Starting $service_name microservice..."
    cd "$base/$service_name" || exit 1
    npm run $mode &
}

# Function to stop the PostgreSQL database server
stop_database() {
    echo "Stopping PostgreSQL database server..."
    pg_ctl -D /opt/homebrew/var/postgresql@14 stop
}

# Function to clean up when the script is terminated
cleanup() {
    # Stop the database server before terminating the script
    stop_database
    exit
}

# Trap the SIGINT signal (Ctrl+C) to call the cleanup function
trap cleanup SIGINT

# Change directory to the PDSD directory
cd "$base" || exit 1

# Start the database server
start_database
 
# Start each microservice
start_microservice "book_service"
start_microservice "user_service"
start_microservice "checkout_service"
start_microservice "request_service"
# Uncomment the following lines if you want to start checkout_service
#
# Wait for all background jobs to finish
wait $(jobs -p)
