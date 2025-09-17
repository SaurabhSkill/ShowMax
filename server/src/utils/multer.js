const multer = require('multer');
const fs = require('fs');
const pathModule = require('path');

const ensureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = path =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // Default directory
      let base = './uploads/' + path;
      // Special handling for movies: split by fieldname into subfolders
      if (path === 'movies' && file && file.fieldname) {
        if (file.fieldname === 'banner') {
          base = pathModule.join('./uploads/movies/banners');
        } else if (file.fieldname === 'poster') {
          base = pathModule.join('./uploads/movies/posters');
        }
      }
      ensureDir(base);
      cb(null, base);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = path =>
  multer({
    storage: storage(path),
    fileFilter: (req, file, cb) => {
      const allowed = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/webp'
      ];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only .png, .jpg, .jpeg, .webp formats allowed'));
      }
    },
  });

module.exports = upload;
