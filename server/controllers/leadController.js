const Lead = require("../models/Lead");

// ==========================
// Create Lead
// ==========================
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      message: "Lead Created Successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Leads
// ==========================
const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate(
      "assignedTo",
      "name email"
    );

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Single Lead
// ==========================
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Lead
// ==========================
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    lead.name = req.body.name || lead.name;
    lead.email = req.body.email || lead.email;
    lead.phone = req.body.phone || lead.phone;
    lead.company = req.body.company || lead.company;
    lead.status = req.body.status || lead.status;
    lead.assignedTo = req.body.assignedTo || lead.assignedTo;

    const updatedLead = await lead.save();

    res.status(200).json({
      message: "Lead Updated Successfully",
      lead: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Lead
// ==========================
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      message: "Lead Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Export Controllers
// ==========================
module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};