# Home Assistant Add-on: ChromaDB

[![GitHub Release][releases-shield]][releases]
![Project Stage][project-stage-shield]
[![License][license-shield]](LICENSE.md)

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
![Supports armhf Architecture][armhf-shield]
![Supports armv7 Architecture][armv7-shield]
![Supports i386 Architecture][i386-shield]

ChromaDB vector database add-on for Home Assistant.

## About

ChromaDB is an open-source embedding database that makes it easy to store and query embeddings for AI applications. This add-on integrates ChromaDB into Home Assistant, providing a simple way to manage and query vector embeddings directly from your Home Assistant instance.

## Features

- 🚀 Easy setup and integration with Home Assistant
- 📊 Modern dashboard for monitoring ChromaDB status
- 💾 Persistent storage support
- 🔒 Secure by default
- 📝 Real-time logging and monitoring
- 🎯 Optimized for Home Assistant environment

## Installation

1. Add our Helm repository to your Home Assistant instance:
   ```yaml
   - Add-on Store > ⋮ > Repositories > https://github.com/yourusername/ha-addon-chromadb
   ```

2. Find the "ChromaDB" add-on in the Add-on Store
3. Click Install
4. Configure the add-on (see configuration section below)
5. Start the add-on
6. Check the logs to ensure it's running properly

## Configuration

Add-on configuration:

```yaml
log_level: info
persistence: true
data_path: /data/chromadb
```

### Option: `log_level`

The `log_level` option controls the level of log output by the add-on and can be changed to be more or less verbose:

- `trace`: Show every detail, like all called internal functions
- `debug`: Shows detailed debug information
- `info`: Normal (usually) interesting events
- `warning`: Exceptional occurrences that are not errors
- `error`: Runtime errors that do not require immediate action
- `fatal`: Something went terribly wrong. Add-on becomes unusable

### Option: `persistence`

- Enable or disable data persistence
- Default value: `true`

### Option: `data_path`

- Path where ChromaDB data will be stored
- Default value: `/data/chromadb`

## Support

Got questions?

You have several options to get them answered:

- The [Home Assistant Discord Chat Server][discord]
- The Home Assistant [Community Forum][forum]
- Join the [Reddit subreddit][reddit] in [/r/homeassistant][reddit]

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armhf-shield]: https://img.shields.io/badge/armhf-yes-green.svg
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[i386-shield]: https://img.shields.io/badge/i386-yes-green.svg
[discord]: https://discord.gg/c5DvZ4e
[forum]: https://community.home-assistant.io
[reddit]: https://reddit.com/r/homeassistant
[releases]: https://github.com/yourusername/ha-addon-chromadb/releases
[releases-shield]: https://img.shields.io/github/release/yourusername/ha-addon-chromadb.svg
[license-shield]: https://img.shields.io/github/license/yourusername/ha-addon-chromadb.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-experimental-yellow.svg
