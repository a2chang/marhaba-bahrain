# Marhaba Bahrain - Fabric Rating App

A React web application for viewing fabric images and assigning ratings/notes to individual fabrics.

## Features

- **User Selection**: Choose between André and Aly with localStorage persistence
- **Fabric Gallery**: View all fabric images with identifier codes
- **Rating System**: Rate fabrics as none/no/maybe/yes
- **Notes**: Add personal notes to each fabric
- **Multi-User Support**: See other user's ratings and notes
- **Filtering**: Simple and advanced filtering by ratings
- **Data Persistence**: All ratings saved to git-committable JSON files
- **Admin Tool**: Review and edit fabric identifier code mappings

## Project Structure

```
marhaba-bahrain/
├── client/src/          # React application source
│   ├── components/      # React components
│   ├── App.jsx          # Main app component
│   └── main.jsx         # React entry point
├── src/                 # Server code
│   ├── server.js        # Express server (port 3500)
│   └── review-server.js # Legacy review server (deprecated)
├── public/              # Static files
│   └── review.html      # Admin review tool
├── data/                # Data files
│   ├── images/          # Downloaded fabric images (gitignored)
│   ├── images-mapping.json  # Image to identifier code mapping
│   └── ratings.json     # User ratings and notes
├── scripts/             # Utility scripts
│   └── download-images.js   # Download images from Dropbox
└── docs/                # Documentation
    └── spec.md          # Project specification
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Download fabric images:
   ```bash
   npm run download-images
   ```

3. Build the React app:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm run server
   ```

## Development

For development with hot reload:
```bash
npm run dev
```

This starts Vite dev server on port 3500 with hot module replacement.

## Usage

### Main App
- Access at: `http://34.56.103.179:3500`
- Select your user (André or Aly)
- Browse fabric images
- Click rating buttons to rate fabrics
- Add notes in the text area
- Use filters to show/hide fabrics by rating

### Admin Review Tool
- Access at: `http://34.56.103.179:3500/admin/review`
- Review and edit fabric identifier codes
- Update the images-mapping.json file

## API Endpoints

- `GET /api/images-mapping` - Get fabric images mapping
- `GET /api/ratings` - Get all ratings
- `POST /api/ratings` - Save a rating
- `GET /api/images/:filename` - Get fabric image
- `POST /api/save-mapping` - Save mapping (admin tool)

## Data Format

### ratings.json
```json
{
  "ratings": [
    {
      "identifier_code": "91261J/47",
      "fabric_number": 1,
      "andre": {
        "rating": "yes",
        "notes": "Great pattern"
      },
      "aly": {
        "rating": "maybe",
        "notes": "Nice but expensive"
      }
    }
  ]
}
```

### images-mapping.json
```json
[
  {
    "identifier_code": "91261J/47",
    "filename": "WhatsApp Image 2025-10-17 at 00.13.17.jpeg",
    "dropbox_url": "https://dl.dropboxusercontent.com/...",
    "fabrics": 6,
    "type": "unknown"
  }
]
```

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build React app for production
- `npm run server` - Start Express server
- `npm start` - Build and start server
- `npm run download-images` - Download images from Dropbox

## Notes

- Images are downloaded locally and gitignored
- Ratings are stored in JSON files for git commits
- User selection persists in localStorage
- No authentication required
- Port 3500 must be open in firewall

