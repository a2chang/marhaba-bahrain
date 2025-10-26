# Marhaba Bahrain - Fabric Rating App - Implementation Plan

## Overview
Build a React web app for viewing fabric images and assigning ratings/notes to individual fabrics. Data persists to git-committable JSON files.

## Architecture
- **Frontend**: React + Vite (port 3500)
- **Backend**: Simple Express.js server to serve React app and handle file writes
- **Data Storage**: JSON files in `data/` directory (git-committable)
- **Images**: Linked from public Dropbox URLs (not copied)

## Data Files

### `data/images-mapping.json`
Maps identifier codes to image filenames and Dropbox URLs.
- Template created, awaiting population from model analysis of Dropbox folder

### `data/ratings.json`
Stores all user ratings and notes.
- Structure: `{ ratings: [{ identifier_code, fabric_number, andre: {rating, notes}, aly: {rating, notes} }] }`
- Ratings: "none", "no", "maybe", "yes"

## Implementation Phases

### Phase 1: Project Setup
- [ ] Initialize React app with Vite
- [ ] Set up Express.js backend server
- [ ] Configure port 3500
- [ ] Set up file write endpoints for ratings persistence
- [ ] Add image download script that runs on app startup
  - Downloads images from Dropbox URLs to `data/images/` directory
  - Skips images already in local cache
  - Updates image paths in app to use local files instead of Dropbox URLs

### Phase 2: Core UI Components
- [ ] User selector modal (first load, localStorage persistence)
- [ ] Image gallery view
- [ ] Fabric card component with:
  - Image display
  - Fabric number indicator
  - Rating selector (none/no/maybe/yes)
  - Notes input field
  - Display of other user's rating/notes

### Phase 3: Filtering
- [ ] Simple filter UI (show/hide by rating)
- [ ] Filter logic: OR for inclusions, AND for exclusions
- [ ] Advanced filter: per-user rating matrix with checkboxes

### Phase 4: Data Persistence
- [ ] Load ratings from `data/ratings.json` on app start
- [ ] Save ratings to file via backend endpoint
- [ ] Handle concurrent user edits gracefully

### Phase 5: Polish & Testing
- [ ] Test all filter combinations
- [ ] Verify data persistence across page reloads
- [ ] Test with both users

## Key Decisions
1. **No separate backend database** - File-based storage keeps it simple and git-friendly
2. **Public Dropbox URLs** - No authentication needed for image access
3. **localStorage for user selection** - Remembers user preference between sessions
4. **Simple Express server** - Minimal backend, just serves React and handles file writes

## Next Steps
1. Wait for model to populate `data/images-mapping.json` with actual image mappings
2. Initialize React + Vite project
3. Set up Express backend
4. Build components in order of phases above

