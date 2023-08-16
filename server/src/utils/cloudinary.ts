import { v2 as cloudinary } from 'cloudinary';
import config from '../../config';
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
  secure: true,
});
export default cloudinary;

export async function handleUpload(req, Path) {
  const b64 = Buffer.from(req.file.buffer).toString('base64');
  const fileURI = 'data:' + req.file.mimetype + ';base64,' + b64;

  const res = await cloudinary.uploader.upload(fileURI, {
    folder: Path,
  });
  return res;
}
