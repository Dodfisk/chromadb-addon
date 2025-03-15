#!/usr/bin/with-contenv bashio
# ==============================================================================
# Home Assistant Community Add-on: ChromaDB
# Entrypoint for the ChromaDB add-on
# ==============================================================================

# Import Home Assistant add-on helpers
source /usr/lib/hassio-addons/base.sh

# Show addon information
bashio::log.info "ChromaDB Add-on - Version $(bashio::addon.version)"
bashio::log.info "By Home Assistant Community Add-ons"

# Check if all required configuration options are provided
if ! bashio::config.has_value 'log_level'; then
    bashio::log.warning "Log level not set, using 'info' as default"
fi

if ! bashio::config.has_value 'persistence'; then
    bashio::log.warning "Persistence not set, using 'true' as default"
fi

if ! bashio::config.has_value 'data_path'; then
    bashio::log.warning "Data path not set, using '/data/chromadb' as default"
fi

# Create the required directories with proper permissions
mkdir -p /data/chromadb
chown -R abc:abc /data/chromadb

# Start the ChromaDB service through S6-overlay
bashio::log.info "Starting ChromaDB service..."
exec /usr/bin/with-contenv s6-overlay-suexec
