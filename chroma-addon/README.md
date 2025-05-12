# Home Assistant Add-on: Vector Store

[![GitHub Release][releases-shield]][releases]
![Project Stage][project-stage-shield]
[![License][license-shield]](LICENSE.md)

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
![Supports armhf Architecture][armhf-shield]
![Supports armv7 Architecture][armv7-shield]
![Supports i386 Architecture][i386-shield]

A lightweight and efficient vector database add-on for Home Assistant.

## About

This add-on provides a vector database service that allows you to store and query vector embeddings. It's built using DocArray for efficient vector storage and similarity search, making it perfect for AI and machine learning applications in your home automation setup.

## Features

- 🚀 Fast and efficient vector similarity search
- 📊 Simple and reliable REST API
- 💾 Optional data persistence
- 🔒 Secure by default
- 📝 Real-time operations
- 🎯 Optimized for Home Assistant environment
- 🔄 Compatible with ChromaDB-style API calls

## Installation

1. Add our repository to your Home Assistant instance:
   ```yaml
   - Add-on Store > ⋮ > Repositories > https://github.com/Dodfisk/chromadb-addon
   ```

2. Find the "Vector Store" add-on in the Add-on Store
3. Click Install
4. Configure the add-on (see configuration section in DOCS.md)
5. Start the add-on
6. Check the logs to ensure it's running properly

## Documentation

Detailed documentation about installation, configuration, and usage can be found in the [DOCS.md](DOCS.md) file.

## Support

Got questions?

You have several options to get them answered:

- The [Home Assistant Discord Chat Server][discord]
- The Home Assistant [Community Forum][forum]
- Join the [Reddit subreddit][reddit] in [/r/homeassistant][reddit]

## Contributing

This is an active open-source project. Feel free to contribute:

- Provide PR (Pull Requests) to improve the code
- Report issues on GitHub
- Suggest new features
- Help others by answering questions

## License

MIT License

Copyright (c) 2024 DeliciousHouse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armhf-shield]: https://img.shields.io/badge/armhf-yes-green.svg
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[i386-shield]: https://img.shields.io/badge/i386-yes-green.svg
[discord]: https://discord.gg/c5DvZ4e
[forum]: https://community.home-assistant.io
[reddit]: https://reddit.com/r/homeassistant
[releases]: https://github.com/DeliciousHouse/chromadb-addon/releases
[releases-shield]: https://img.shields.io/github/release/DeliciousHouse/chromadb-addon.svg
[license-shield]: https://img.shields.io/github/license/DeliciousHouse/chromadb-addon.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-experimental-yellow.svg
