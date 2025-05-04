"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_middleware_1 = require("../middleware/multer-middleware");
const uploadImage_1 = require("../controllers/uploadImage");
const router = (0, express_1.Router)();
router.route("/image")
    .post(multer_middleware_1.upload.array("images", 10), uploadImage_1.handleImageUpload);
exports.default = router;
