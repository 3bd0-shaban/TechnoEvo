import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ensureDir } from 'fs-extra';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths, IMiscConfig } from '~/config';

@Injectable()
export class FileUploadPipe implements PipeTransform {
  private readonly uploadPath: string;

  constructor(private readonly configService: ConfigService<ConfigKeyPaths>) {
    const uploadPath = this.configService.get<IMiscConfig>('misc')?.MEDIA_DEST;
    this.uploadPath = uploadPath;
  }

  async transform(file: any, metadata: ArgumentMetadata): Promise<any> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    await ensureDir(this.uploadPath);

    return new Promise((resolve, reject) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;

      const storage = diskStorage({
        destination: (req, file, cb) => {
          cb(null, this.uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, filename);
        },
      });

      storage._handleFile(null, file, (err) => {
        if (err) {
          reject(new BadRequestException('File upload failed'));
        } else {
          resolve({
            ...file,
            filename,
          });
        }
      });
    });
  }
}
