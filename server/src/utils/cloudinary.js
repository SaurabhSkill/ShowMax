const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure multer for memory storage (files will be uploaded to Cloudinary, not disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('File filter - Received file:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    const allowed = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/webp',
      'image/gif'
    ];
    
    if (allowed.includes(file.mimetype)) {
      console.log('✅ File accepted:', file.originalname);
      cb(null, true);
    } else {
      console.log('❌ File rejected:', file.originalname, 'Type:', file.mimetype);
      cb(new Error(`Only ${allowed.join(', ')} formats allowed. Received: ${file.mimetype}`));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // Increased to 10MB limit
  },
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    console.log('🔄 Starting Cloudinary upload with options:', options);
    
    const uploadOptions = {
      resource_type: 'image',
      folder: options.folder || 'cinema-plus',
      public_id: options.public_id,
      transformation: options.transformation || [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      ...options
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          console.log('✅ Cloudinary upload successful:', {
            public_id: result.public_id,
            secure_url: result.secure_url,
            format: result.format,
            bytes: result.bytes
          });
          resolve(result);
        }
      }
    );

    // Handle stream errors
    uploadStream.on('error', (error) => {
      console.error('❌ Upload stream error:', error);
      reject(error);
    });

    uploadStream.end(buffer);
  });
};

// Helper function to delete image from Cloudinary
const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    console.log('🗑️ Deleting from Cloudinary:', publicId);
    
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error('❌ Cloudinary delete error:', error);
        reject(error);
      } else {
        console.log('✅ Cloudinary delete result:', result);
        resolve(result);
      }
    });
  });
};

// Helper function to extract public ID from Cloudinary URL
const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl || typeof cloudinaryUrl !== 'string') return null;
  
  try {
    // Handle different Cloudinary URL formats
    // Example: https://res.cloudinary.com/ddxmzur4y/image/upload/v1234567890/cinema-plus/movie_banner_abc123.jpg
    const urlParts = cloudinaryUrl.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after version number (or upload if no version)
    let pathAfterUpload = urlParts.slice(uploadIndex + 1);
    
    // Remove version if present (starts with 'v' followed by numbers)
    if (pathAfterUpload[0] && /^v\d+$/.test(pathAfterUpload[0])) {
      pathAfterUpload = pathAfterUpload.slice(1);
    }
    
    // Join the remaining path and remove file extension
    const publicIdWithExtension = pathAfterUpload.join('/');
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '');
    
    console.log('📝 Extracted public ID:', publicId, 'from URL:', cloudinaryUrl);
    return publicId;
  } catch (error) {
    console.error('❌ Error extracting public ID from URL:', cloudinaryUrl, error);
    return null;
  }
};

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary,
  deleteFromCloudinary,
  extractPublicId
};