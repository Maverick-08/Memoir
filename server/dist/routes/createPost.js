"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_config_1 = require("../config/multer-config");
const postController_1 = require("../controllers/postController");
const postImpressionController_1 = require("../controllers/postImpressionController");
const router = (0, express_1.Router)();
router.route("/")
    .post(multer_config_1.uploadPostImage.array("images", 10), postController_1.postCreationhandler);
router.route("/impression")
    .get(postImpressionController_1.postImpressionHandler);
exports.default = router;
