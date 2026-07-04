const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

// Create Lead
router.post("/", protect, createLead);

// Get All Leads
router.get("/", protect, getAllLeads);

// Get Single Lead
router.get("/:id", protect, getLeadById);

// Update Lead
router.put("/:id", protect, updateLead);

// Delete Lead
router.delete("/:id", protect, deleteLead);

module.exports = router;