const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/role");

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/services/:id
// router.patch("/:id", async (req, res) => {
//   try {
//     const updatedService = await Service.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedService);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update service status" });
//   }
// });
router.patch("/:id", protect, adminOnly, async (req, res) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(updatedService);
});


// POST create a new service
// router.post("/", async (req, res) => {
//   try {
//     const service = new Service(req.body);
//     const savedService = await service.save();
//     res.status(201).json(savedService);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.post("/", protect, adminOnly, async (req, res) => {
  const service = new Service(req.body);
  const savedService = await service.save();
  res.status(201).json(savedService);
});

// PUT update service by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedService = await Service.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true } // returns the updated document
//     );
//     if (!updatedService)
//       return res.status(404).json({ error: "Service not found" });
//     res.json(updatedService);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
router.put("/:id", protect, adminOnly, async (req, res) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedService);
});
// DELETE service by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedService = await Service.findByIdAndDelete(req.params.id);
//     if (!deletedService)
//       return res.status(404).json({ error: "Service not found" });
//     res.json({ message: "Service deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted successfully" });
});

module.exports = router;
