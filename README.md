
# Media Scraper

This project is a media scraper that extracts image and video URLs from web pages. It uses TypeScript, Node.js, and Sequelize with a PostgreSQL database.

## Prerequisites

- Node.js
- npm
- Docker
- Docker Compose

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following content:
   ```env
   DB_NAME=example
   DB_USER=example
   DB_PASSWORD=example
   DB_HOST=example
   DB_PORT=example
   PORT=8000
   AUTH_USERNAME=example
   AUTH_PASSWORD=example
   DATABASE_URL=postgres://example:example@localhost:5432/example
   ```

4. **Start the services** using Docker Compose:
   ```bash
   docker-compose up
   ```

## Usage

1. **Run the scraper**:
   ```bash
   npm run scrape
   ```

2. **Format the code**:
   ```bash
   npm run format
   ```

3. **Check code formatting**:
   ```bash
   npm run format:check
   ```

## Project Structure

- `src/`: Contains the source code.
- `src/utils/`: Utility functions, including the scraper.
- `src/models/`: Sequelize models.
- `src/services/`: Service classes, including the scraper service.
- `.prettierrc`: Prettier configuration file.
- `.prettierignore`: Files and directories to ignore by Prettier.
- `docker-compose.yml`: Docker Compose configuration.


