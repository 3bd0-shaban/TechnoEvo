import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.NEXT_PUNLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUNLIC_API_KEY,
    api_secret: process.env.NEXT_PUNLIC_API_SECRET,
    secure: true
});

export default cloudinary