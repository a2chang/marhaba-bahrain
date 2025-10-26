const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;
const DATA_DIR = path.join(__dirname, '..', 'data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');
const MAPPING_FILE = path.join(DATA_DIR, 'images-mapping.json');
const RATINGS_FILE = path.join(DATA_DIR, 'ratings.json');

app.use(express.json());

// Serve static files from dist (production) or public (dev)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
}

// Serve admin review page
app.get('/admin/review', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'review.html'));
});

// API: Get images mapping
app.get('/api/images-mapping', (req, res) => {
    fs.readFile(MAPPING_FILE, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ error: 'Mapping file not found' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// API: Save mapping (for admin review page)
app.post('/api/save-mapping', (req, res) => {
    try {
        const mappingData = req.body;
        fs.writeFileSync(MAPPING_FILE, JSON.stringify(mappingData, null, 2));
        res.json({ success: true, message: 'Mapping saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// API: Get ratings
app.get('/api/ratings', (req, res) => {
    fs.readFile(RATINGS_FILE, 'utf8', (err, data) => {
        if (err) {
            // If file doesn't exist, return empty ratings
            res.json({ ratings: [] });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// API: Save a single rating
app.post('/api/ratings', (req, res) => {
    try {
        const newRating = req.body;

        // Read existing ratings
        let ratingsData = { ratings: [] };
        if (fs.existsSync(RATINGS_FILE)) {
            ratingsData = JSON.parse(fs.readFileSync(RATINGS_FILE, 'utf8'));
        }

        // Find and update or add the rating
        const index = ratingsData.ratings.findIndex(
            r => r.identifier_code === newRating.identifier_code &&
                 r.fabric_number === newRating.fabric_number
        );

        if (index >= 0) {
            ratingsData.ratings[index] = newRating;
        } else {
            ratingsData.ratings.push(newRating);
        }

        // Save back to file
        fs.writeFileSync(RATINGS_FILE, JSON.stringify(ratingsData, null, 2));
        res.json({ success: true, message: 'Rating saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// API: Serve images
app.get('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(IMAGES_DIR, filename);

    // Security: prevent directory traversal
    if (!filepath.startsWith(IMAGES_DIR)) {
        res.status(403).json({ error: 'Access denied' });
        return;
    }

    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.status(404).json({ error: 'Image not found' });
            return;
        }

        // Determine content type based on file extension
        const ext = path.extname(filename).toLowerCase();
        const contentType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        }[ext] || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        res.send(data);
    });
});

// Legacy endpoints for backward compatibility
app.get('/data/images/:filename', (req, res) => {
    req.url = `/api/images/${req.params.filename}`;
    app.handle(req, res);
});

app.get('/data/images-mapping.json', (req, res) => {
    req.url = '/api/images-mapping';
    app.handle(req, res);
});

// Serve React app for all other routes (SPA fallback)
app.use((req, res) => {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('App not built yet. Run: npm run build');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📋 Main app: http://34.56.103.179:${PORT}`);
    console.log(`📋 Admin review: http://34.56.103.179:${PORT}/admin/review`);
});

