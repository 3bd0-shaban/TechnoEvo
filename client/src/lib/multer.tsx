import multer from "multer";
import { toast } from "react-hot-toast";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"));
        toast.error('Unsupported file type');
    }
};

const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter,
});

export default upload;
