import multer from "multer";
import multerS3 from "multer-s3";
import {s3} from "./AWS-config"
import {v4 as uuid} from "uuid"


export const uploadPostImage = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_S3_BUCKET!,
      key: (req, file, cb) => {
        cb(null, `post/images/${uuid()}-${file.originalname}`);
      },
    }),
  });
  