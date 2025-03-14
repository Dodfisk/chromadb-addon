#!/usr/bin/with-contenv bashio
# ==============================================================================
# Home Assistant Add-on: ChromaDB
# Runs ChromaDB
# ==============================================================================

# Set up error handling
set -e

# Enable job control
set -m

# Function to cleanup on exit
cleanup() {
    bashio::log.info "Shutting down ChromaDB..."
    kill -TERM "$CHROMA_PID" 2>/dev/null || true
    wait "$CHROMA_PID"
    bashio::log.info "ChromaDB has been stopped"
}

# Set up trap for cleanup
trap cleanup SIGTERM SIGHUP

# Get config values
declare log_level
declare persistence
declare data_path

log_level=$(bashio::config 'log_level')
persistence=$(bashio::config 'persistence')
data_path=$(bashio::config 'data_path')

# Show configuration
bashio::log.info "Starting ChromaDB add-on..."
bashio::log.info "Log level: ${log_level}"
bashio::log.info "Persistence enabled: ${persistence}"
bashio::log.info "Data path: ${data_path}"

# Create data directory if persistence is enabled
if bashio::var.true "${persistence}"; then
    bashio::log.info "Setting up persistent storage at ${data_path}"
    mkdir -p "${data_path}"
fi

# Set up environment variables for ChromaDB
export CHROMA_SERVER_HOST="0.0.0.0"
export CHROMA_SERVER_PORT="8000"
export CHROMA_SERVER_LOG_LEVEL="${log_level}"

if bashio::var.true "${persistence}"; then
    export CHROMA_PERSISTENCE_DIRECTORY="${data_path}"
fi

# Start ChromaDB server
bashio::log.info "Starting ChromaDB server..."
uvicorn chromadb.app:app \
    --host 0.0.0.0 \
    --port 8000 \
    --log-level "${log_level}" \
    --proxy-headers \
    --forwarded-allow-ips "*" &

CHROMA_PID=$!

# Wait for ChromaDB to start
bashio::log.info "Waiting for ChromaDB to start..."
sleep 5

# Check if ChromaDB is running
if ! kill -0 "$CHROMA_PID" 2>/dev/null; then
    bashio::log.error "ChromaDB failed to start"
    exit 1
fi

bashio::log.info "ChromaDB is running"

# Keep the script running
wait "$CHROMA_PID"
