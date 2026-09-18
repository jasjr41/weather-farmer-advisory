const express = require("express");
const {
    createFarm,
    getFarms,
    getFarmById,
    updateFarm
} = require("../controllers/farmController.js");
const router = express.Router();


// ==========================================
// CREATE FARM
// POST /api/farms
// ==========================================

router.post("/", createFarm);


// ==========================================
// GET ALL FARMS
// GET /api/farms
// ==========================================

router.get("/", getFarms);


// ==========================================
// GET SINGLE FARM
// GET /api/farms/:id
// ==========================================

router.get("/:id", getFarmById);
router.put("/:id", updateFarm);


module.exports = router;