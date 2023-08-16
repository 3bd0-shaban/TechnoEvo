import multer from 'multer';
import { Request } from 'express';
import path from 'path';

const storage = multer.memoryStorage(); // Use MemoryStorage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __dirname); // Store images in the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix =
//       new Date().toISOString().replace(/:/g, '-') +
//       '-' +
//       Math.round(Math.random() * 1e9);
//     const extname = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + extname);
//   },
// });
const fileFilter = (
  req: Request,
  file,
  cb: multer.FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};

const upload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024 },
  // fileFilter,
});

export default upload;
