"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_code_1 = require("../config/status-code");
const router = (0, express_1.Router)();
router.route("/").get((req, res) => {
    res.status(status_code_1.StatusCode.RequestSuccessfull).json(req.userDetails);
    return;
});
exports.default = router;
