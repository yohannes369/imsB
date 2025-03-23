import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp and original extension
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    // Accept only image files (jpeg, jpg, png)
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true); // Accept the file
    }
    cb(new Error('Only images (jpeg, jpg, png) are allowed')); // Reject non-image files
  },
});

// Export the middleware for single file upload (field name: 'profile_photo')
export const uploadMiddleware = upload.single('profile_photo');