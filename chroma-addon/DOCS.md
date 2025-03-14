# Home Assistant Add-on: ChromaDB

## Installation

1. Click the Home Assistant My button below to open the add-on on your Home
   Assistant instance.

   [![Open this add-on in your Home Assistant instance.][addon-badge]][addon]

2. Click the "Install" button to install the add-on.
3. Start the "ChromaDB" add-on.
4. Check the logs of the "ChromaDB" add-on to see if everything went well.
5. Open the Web UI to access the ChromaDB dashboard.

## Configuration

### Option: `log_level`

The `log_level` option controls the level of log output by the add-on and can
be changed to be more or less verbose:

- `trace`: Show every detail, like all called internal functions.
- `debug`: Shows detailed debug information.
- `info`: Normal (usually) interesting events.
- `warning`: Exceptional occurrences that are not errors.
- `error`: Runtime errors that do not require immediate action.
- `fatal`: Something went terribly wrong. Add-on becomes unusable.

Please note that each level automatically includes log messages from a
more severe level, e.g., `debug` also shows `info` messages. By default,
the `log_level` is set to `info`, which is the recommended setting unless
you are troubleshooting.

### Option: `persistence`

When enabled, ChromaDB will store its data persistently in the specified data
directory. This means the data will survive add-on restarts and updates.

- `true`: Enable persistent storage (recommended)
- `false`: Disable persistent storage

**Note**: When disabled, all data will be lost when the add-on restarts!

### Option: `data_path`

The path where ChromaDB will store its persistent data. By default, this is set
to `/data/chromadb`. You generally don't need to change this unless you have
specific requirements.

## Web UI

The add-on provides a modern web interface for monitoring ChromaDB's status and
viewing logs. The interface includes:

- Service status indicator
- Memory usage statistics
- Collection count
- Uptime tracking
- Real-time log viewer
- Manual refresh option

## API Integration

ChromaDB exposes its API on port 8000. You can interact with it using various
client libraries or direct HTTP requests.

### Python Client Example

```python
from chromadb import Client

client = Client(host="your-ha-instance", port=8000)
collection = client.create_collection("my_collection")

# Add documents
collection.add(
    documents=["This is a document", "This is another document"],
    metadatas=[{"source": "doc1"}, {"source": "doc2"}],
    ids=["id1", "id2"]
)

# Query
results = collection.query(
    query_texts=["document"],
    n_results=2
)
```

## Troubleshooting

### Add-on Fails to Start

1. Check the add-on logs for error messages
2. Verify that the configuration options are correct
3. Ensure the data directory is writable
4. Check if port 8000 is not in use by another service

### Cannot Connect to ChromaDB

1. Verify the add-on is running (check status in Home Assistant)
2. Check if the port 8000 is properly exposed
3. Ensure your client is using the correct host and port
4. Check your network/firewall settings

### Data Persistence Issues

1. Verify the `persistence` option is enabled
2. Check if the `data_path` directory exists and is writable
3. Ensure sufficient disk space is available

## Support

Got questions?

You have several options to get them answered:

- The [Home Assistant Discord Chat Server][discord]
- The Home Assistant [Community Forum][forum]
- Join the [Reddit subreddit][reddit] in [/r/homeassistant][reddit]

For bug reports, please create an issue in our [GitHub repository][github].

## Contributing

This is an active open-source project. Feel free to contribute:

- Provide PR (Pull Requests) to improve the code
- Report issues on GitHub
- Suggest new features
- Help others by answering questions

[addon-badge]: https://my.home-assistant.io/badges/supervisor_addon.svg
[addon]: https://my.home-assistant.io/redirect/supervisor_addon/?addon=xxxxx/chromadb
[discord]: https://discord.gg/c5DvZ4e
[forum]: https://community.home-assistant.io
[reddit]: https://reddit.com/r/homeassistant
[github]: https://github.com/yourusername/ha-addon-chromadb
