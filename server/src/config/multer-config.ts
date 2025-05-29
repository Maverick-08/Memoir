import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./AWS-config";
import { v4 as uuid } from "uuid";

export const uploadPostImage = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET!,
    key: (req, file, cb) => {
      cb(null, `post/images/${uuid()}-${file.originalname}`);
    },
  }),
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "profileImage") {
      cb(null, "./uploads/profile");
    } else {
      cb(null, "./uploads/background");
    }
  },
  filename: (req, file, cb) => {
    const userDetails = req["userDetails"] as { userId: string; email: string };
    const fileName = userDetails.userId + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const uploadProfileAndBackgroundImage = multer({ storage });
