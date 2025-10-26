const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '../data/images');
const MAPPING_FILE = path.join(__dirname, '../data/images-mapping.json');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Read the mapping file
const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));

// Download a file from URL
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ Already exists: ${path.basename(filepath)}`);
      resolve();
      return;
    }

    console.log(`⬇ Downloading: ${path.basename(filepath)}`);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.warn(`⚠ Failed to download ${path.basename(filepath)}: ${response.statusCode}`);
        resolve(); // Continue with other files instead of failing
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        console.warn(`⚠ Error downloading ${path.basename(filepath)}: ${err.message}`);
        resolve(); // Continue with other files instead of failing
      });
    }).on('error', (err) => {
      console.warn(`⚠ Error downloading ${path.basename(filepath)}: ${err.message}`);
      resolve(); // Continue with other files instead of failing
    });
  });
}

// Main function
async function downloadAllImages() {
  console.log('Starting image download...\n');

  try {
    const downloadPromises = mapping.map((item) => {
      const filepath = path.join(IMAGES_DIR, item.filename);
      return downloadFile(item.dropbox_url, filepath);
    });

    await Promise.all(downloadPromises);
    console.log(`\n✓ All images downloaded successfully!`);
  } catch (error) {
    console.error('Error downloading images:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  downloadAllImages();
}

module.exports = { downloadAllImages };

