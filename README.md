# fPKGi List Editor

A professional, self-hosted web application designed to manage `GAMES.json` lists for the fPKGi application on PS4. This tool simplifies the process of adding, removing, and editing game entries, providing a modern UI over the raw JSON file.

## 🚀 Features

- **Full CRUD Management**: Easily add, edit, and delete game entries from your `GAMES.json` list.
- **Live Search**: Quick-filter the game list by name in real-time.
- **Visual Previews**: Hover over any game row to instantly see its cover art.
- **Direct fPKGi Support**: Serves the raw `GAMES.json` at `/GAMES.json` for direct integration with PS4 clients.
- **Orbis Patches Integration**: Title IDs are clickable, linking directly to [orbispatches.com](https://orbispatches.com).
- **Modern UI/UX**: 
  - Responsive design.
  - Dynamic Dark/Light mode support.
  - Professional aesthetic with smooth transitions and cover art previews.
- **Dockerized**: Ready for instant deployment on any Linux server.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3 (Custom Variables), JavaScript (Vanilla)
- **Containerization**: Docker, Docker Compose

## 📦 Deployment

### Prerequisites
- Docker and Docker Compose installed on your server.

### Installation
1. Clone or upload the project folder to your server.
2. Navigate to the project root:
   ```bash
   cd fPKGi-List-Editor
   ```
3. Start the application:
   ```bash
   docker-compose up --build -d
   ```

### Accessing the App
- **Manager UI**: `http://<your-server-ip>:3000`
- **Raw JSON for fPKGi**: `http://<your-server-ip>:3000/GAMES.json`

## ⚙️ Configuration
The application uses a Docker volume to persist your data. Any changes made via the UI are written directly to the `GAMES.json` file in the root directory of the project on the host machine.
