"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useStatsController_1 = require("../controllers/useStatsController");
const router = (0, express_1.Router)();
router.route("/stats")
    .get(useStatsController_1.userStatsHandler);
exports.default = router;
