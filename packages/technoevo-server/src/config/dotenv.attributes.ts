import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(
    __dirname,
    '../../',
    process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env.production',
  ),
});

export const uploadPath = process.env.MEDIA_DEST;
