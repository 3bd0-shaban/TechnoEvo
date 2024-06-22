import { MulterOptions as MulterOptionsProps } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { uploadPath } from '~/config/dotenv.attributes';
import { existsSync, mkdirSync } from 'fs';

const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const generateFilename = (file) => {
  const name = file.originalname.split('.')[0];
  const extension = extname(file.originalname);
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return `${name}-${randomName}${extension}`;
};

// Define file filters
const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new BadRequestException('Unsupported image file type'), false);
  }
  cb(null, true);
};

const videoFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'video/mp4',
    'video/x-matroska',
    'video/avi',
    'video/mpeg',
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new BadRequestException('Unsupported video file type'), false);
  }
  cb(null, true);
};

// Define Multer options for images
export const MulterImageOptions: MulterOptionsProps = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const imagePath = `${uploadPath}/images`;
      ensureDir(imagePath);
      cb(null, imagePath);
    },
    filename: (req, file, cb) => {
      cb(null, generateFilename(file));
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit for images
    files: 1, // Only one file allowed
    fieldNameSize: 100, // Max field name size
    fieldSize: 2 * 1024 * 1024, // Max field size 2 MB
  },
  fileFilter: imageFileFilter,
};

// Define Multer options for videos
export const MulterVideoOptions: MulterOptionsProps = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const videoPath = `${uploadPath}/videos`;
      ensureDir(videoPath);
      cb(null, videoPath);
    },
    filename: (req, file, cb) => {
      cb(null, generateFilename(file));
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB file size limit for videos
    files: 1, // Only one file allowed
    fieldNameSize: 100, // Max field name size
    fieldSize: 2 * 1024 * 1024, // Max field size 2 MB
  },
  fileFilter: videoFileFilter,
};
