"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userUpdate_1 = require("../controllers/userUpdate");
const router = (0, express_1.Router)();
router.route("/")
    .get(userUpdate_1.getUserUpdates)
    .post(userUpdate_1.postUserUpdates);
exports.default = router;
