"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_code_1 = require("../config/status-code");
const router = (0, express_1.Router)();
router
    .route("/")
    .get((req, res) => {
    res.sendStatus(status_code_1.StatusCode.RequestSuccessfull);
});
exports.default = router;
