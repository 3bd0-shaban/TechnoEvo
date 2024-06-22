import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FileDeleteService {
  async deleteImage(filePath: string): Promise<void> {
    console.log(`Attempting to delete file: ${filePath}`);
    const full_filePath = join(filePath);

    try {
      // Check if the file exists
      await fs.access(full_filePath);
      console.log(`File found: ${full_filePath}`);

      // Delete the file
      await fs.unlink(full_filePath);
      console.log(`File deleted successfully: ${full_filePath}`);
    } catch (err) {
      console.error(
        `Error occurred while deleting file: ${full_filePath}`,
        err,
      );
      if (err.code === 'ENOENT') {
        throw new NotFoundException('File not found');
      } else {
        throw new InternalServerErrorException('Error deleting the file');
      }
    }
  }
}
