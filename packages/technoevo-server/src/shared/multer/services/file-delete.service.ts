import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { uploadPath } from '~/config/dotenv.attributes';

@Injectable()
export class FileDeleteService {
  async deleteImage(filePath: string): Promise<void> {
    const full_filePath = join(uploadPath, filePath);
    console.log(full_filePath);
    try {
      // Check if the file exists
      await fs.access(full_filePath);

      // Delete the file
      await fs.unlink(full_filePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new NotFoundException('File not found');
      } else {
        throw new InternalServerErrorException('Error deleting the file');
      }
    }
  }
}
