const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/upload");

// ==========================================
// MIDDLEWARE: Handle Multiple Uploads
// ==========================================
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "bannerImage", maxCount: 1 },
  { name: "portraitImage", maxCount: 1 },
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
]);

function handleUpload(req, res, next) {
  uploadFields(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}

const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/role");

// ==========================================
// UTILITY: Parse JSON & Safely Delete Files
// ==========================================
const parseJsonFields = (body) => {
  const parsedBody = { ...body };
  const jsonFields = [
    "seo",
    "banner",
    "shortSummary",
    "servicesSection",
    "specialServicesSection",
    "whyUsSection",
    "faqSection",
    "ctaSection",
  ];

  jsonFields.forEach((field) => {
    if (parsedBody[field] && typeof parsedBody[field] === "string") {
      try {
        parsedBody[field] = JSON.parse(parsedBody[field]);
      } catch (err) {
        console.error(`Failed to parse JSON for field: ${field}`, err);
      }
    }
  });

  return parsedBody;
};

// Helper function to delete old files from the filesystem
const safeUnlink = (filePath) => {
  if (filePath) {
    const oldPath = path.join(__dirname, "..", filePath);
    fs.unlink(oldPath, (e) => { }); // ignore errors if file doesn't exist
  }
};

// ==========================================
// ROUTES
// ==========================================

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
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

// POST create new service
router.post("/", protect, adminOnly, handleUpload, async (req, res) => {
  try {
    const payload = parseJsonFields(req.body);

    // Ensure nested objects exist before adding paths to them
    if (!payload.banner) payload.banner = {};
    if (!payload.shortSummary) payload.shortSummary = {};

    // Map uploaded files to their schema paths
    if (req.files) {
      if (req.files.image) payload.image = req.files.image[0].path.replace(/\\/g, "/");

      if (req.files.bannerImage) payload.banner.bannerImage = req.files.bannerImage[0].path.replace(/\\/g, "/");
      if (req.files.portraitImage) payload.banner.portraitImage = req.files.portraitImage[0].path.replace(/\\/g, "/");

      if (req.files.image1) payload.shortSummary.image1 = req.files.image1[0].path.replace(/\\/g, "/");
      if (req.files.image2) payload.shortSummary.image2 = req.files.image2[0].path.replace(/\\/g, "/");
    }

    const service = new Service(payload);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Service title or slug already exists." });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT (full) update service
router.put("/:id", protect, adminOnly, handleUpload, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const parsedBody = parseJsonFields(req.body);

    // Ensure nested objects exist to prevent undefined errors
    if (!parsedBody.banner) parsedBody.banner = service.banner || {};
    if (!parsedBody.shortSummary) parsedBody.shortSummary = service.shortSummary || {};

    if (req.files) {
      // Main Image
      if (req.files.image) {
        safeUnlink(service.image);
        parsedBody.image = req.files.image[0].path.replace(/\\/g, "/");
      }
      // Banner Images
      if (req.files.bannerImage) {
        if (service.banner?.bannerImage) safeUnlink(service.banner.bannerImage);
        parsedBody.banner.bannerImage = req.files.bannerImage[0].path.replace(/\\/g, "/");
      }
      if (req.files.portraitImage) {
        if (service.banner?.portraitImage) safeUnlink(service.banner.portraitImage);
        parsedBody.banner.portraitImage = req.files.portraitImage[0].path.replace(/\\/g, "/");
      }
      // Short Summary Images
      if (req.files.image1) {
        if (service.shortSummary?.image1) safeUnlink(service.shortSummary.image1);
        parsedBody.shortSummary.image1 = req.files.image1[0].path.replace(/\\/g, "/");
      }
      if (req.files.image2) {
        if (service.shortSummary?.image2) safeUnlink(service.shortSummary.image2);
        parsedBody.shortSummary.image2 = req.files.image2[0].path.replace(/\\/g, "/");
      }
    }

    Object.assign(service, parsedBody);
    const updated = await service.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH (partial) update
router.patch("/:id", protect, adminOnly, handleUpload, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    const parsedBody = parseJsonFields(req.body);

    if (!parsedBody.banner) parsedBody.banner = service.banner || {};
    if (!parsedBody.shortSummary) parsedBody.shortSummary = service.shortSummary || {};

    if (req.files) {
      if (req.files.image) {
        safeUnlink(service.image);
        parsedBody.image = req.files.image[0].path.replace(/\\/g, "/");
      }
      if (req.files.bannerImage) {
        if (service.banner?.bannerImage) safeUnlink(service.banner.bannerImage);
        parsedBody.banner.bannerImage = req.files.bannerImage[0].path.replace(/\\/g, "/");
      }
      if (req.files.portraitImage) {
        if (service.banner?.portraitImage) safeUnlink(service.banner.portraitImage);
        parsedBody.banner.portraitImage = req.files.portraitImage[0].path.replace(/\\/g, "/");
      }
      if (req.files.image1) {
        if (service.shortSummary?.image1) safeUnlink(service.shortSummary.image1);
        parsedBody.shortSummary.image1 = req.files.image1[0].path.replace(/\\/g, "/");
      }
      if (req.files.image2) {
        if (service.shortSummary?.image2) safeUnlink(service.shortSummary.image2);
        parsedBody.shortSummary.image2 = req.files.image2[0].path.replace(/\\/g, "/");
      }
    }

    Object.assign(service, parsedBody);
    const updated = await service.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE service
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Clean up all associated image files
    safeUnlink(service.image);
    if (service.banner) {
      safeUnlink(service.banner.bannerImage);
      safeUnlink(service.banner.portraitImage);
    }
    if (service.shortSummary) {
      safeUnlink(service.shortSummary.image1);
      safeUnlink(service.shortSummary.image2);
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;