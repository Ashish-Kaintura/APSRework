const express = require("express");
const router = express.Router();
const BlogModal = require("../models/Blog");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/role");
// GET all Blogs
router.get("/", async (req, res) => {
  try {
    const blog = await BlogModal.find();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single Blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await BlogModal.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// POST a new Blog
// router.post("/", async (req, res) => {
//   try {
//     const newBlog = new BlogModal(req.body);
//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.post("/", protect, adminOnly, async (req, res) => {
  const newBlog = new BlogModal(req.body);
  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
});

// PUT (update) a Blog by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedBlog = await BlogModal.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedBlog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.put("/:id", protect, adminOnly, async (req, res) => {
  const updatedBlog = await BlogModal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedBlog);
});

// DELETE a Blog by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedBlog = await BlogModal.findByIdAndDelete(req.params.id);
//     if (!deletedBlog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
//     res.json({ message: "Blog deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await BlogModal.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted successfully" });
});

// SEARCH Blogs by title, meta title, or description
router.get("/search/query", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = await BlogModal.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { metatitle: { $regex: q, $options: "i" } },
        { metadescription: { $regex: q, $options: "i" } },
        { longdescription: { $regex: q, $options: "i" } }
      ],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
