const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;
const DATA_DIR = path.join(__dirname, '..', 'data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');
const MAPPING_FILE = path.join(DATA_DIR, 'images-mapping.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Serve fabric review page
app.get('/fabric-review', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'review.html'));
});

app.get('/fabric-review.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'review.html'));
});

// API: Serve cached images
app.get('/data/images/:filename', (req, res) => {
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

// API: Get mapping
app.get('/data/images-mapping.json', (req, res) => {
    fs.readFile(MAPPING_FILE, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ error: 'Mapping file not found' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// API: Save mapping
app.post('/api/save-mapping', (req, res) => {
    try {
        const mappingData = req.body;
        fs.writeFileSync(MAPPING_FILE, JSON.stringify(mappingData, null, 2));
        res.json({ success: true, message: 'Mapping saved successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📋 Open http://34.56.103.179:${PORT} in your browser`);
});

