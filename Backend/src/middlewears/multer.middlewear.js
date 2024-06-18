import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Replicate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const uploadDir = path.join(__dirname, '../../../../../tmp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original filename
  }
});

// Initialize Multer with the configured storage
export const upload = multer({ storage:storage});