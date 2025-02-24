"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/")
    .get((req, res) => {
    res.send("Server is healthy");
});
exports.default = router;
