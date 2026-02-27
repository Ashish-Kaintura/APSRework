const express = require("express");
const router = express.Router();
const BlogModal = require("../models/Blog");
const { protect } = require("../middleware/auth");
const { adminOnly } = require("../middleware/role");
const upload = require("../middleware/upload");
const BASE_URL = "http://localhost:5000";
const fs = require("fs");
const path = require("path");

// GET all Blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModal.find();

    const updatedBlogs = blogs.map((blog) => ({
      ...blog._doc,
      CoverImage: blog.CoverImage
        ? `${BASE_URL}${blog.CoverImage}`
        : "",
      Image: blog.Image ? `${BASE_URL}${blog.Image}` : "",
      Image2: blog.Image2 ? `${BASE_URL}${blog.Image2}` : "",
      bgImage: blog.bgImage ? `${BASE_URL}${blog.bgImage}` : "",
    }));

    res.json(updatedBlogs);
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

    res.json({
      ...blog._doc,
      CoverImage: blog.CoverImage
        ? `${BASE_URL}${blog.CoverImage}`
        : "",
      Image: blog.Image ? `${BASE_URL}${blog.Image}` : "",
      Image2: blog.Image2 ? `${BASE_URL}${blog.Image2}` : "",
      bgImage: blog.bgImage ? `${BASE_URL}${blog.bgImage}` : "",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// POST a new Blog

// router.post("/", protect, adminOnly, async (req, res) => {
//   const newBlog = new BlogModal(req.body);
//   const savedBlog = await newBlog.save();
//   res.status(201).json(savedBlog);
// });

router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "CoverImage", maxCount: 1 },
    { name: "Image", maxCount: 1 },
    { name: "Image2", maxCount: 1 },
    { name: "bgImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const blogData = {
        ...req.body,
        CoverImage: req.files?.CoverImage
          ? `/uploads/blogs/${req.files.CoverImage[0].filename}`
          : "",
        Image: req.files?.Image
          ? `/uploads/blogs/${req.files.Image[0].filename}`
          : "",
        Image2: req.files?.Image2
          ? `/uploads/blogs/${req.files.Image2[0].filename}`
          : "",
        bgImage: req.files?.bgImage
          ? `/uploads/blogs/${req.files.bgImage[0].filename}`
          : "",
      };

      const blog = new BlogModal(blogData);
      const savedBlog = await blog.save();

      res.status(201).json(savedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// PUT (update) a Blog by ID


// router.put("/:id", protect, adminOnly, async (req, res) => {
//   const updatedBlog = await BlogModal.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updatedBlog);
// });

// router.put(
//   "/:id",
//   protect,
//   adminOnly,
//   upload.fields([
//     { name: "CoverImage", maxCount: 1 },
//     { name: "Image", maxCount: 1 },
//     { name: "Image2", maxCount: 1 },
//     { name: "bgImage", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const updateData = { ...req.body };

//       if (req.files?.CoverImage) {
//         updateData.CoverImage = `/uploads/blogs/${req.files.CoverImage[0].filename}`;
//       }
//       if (req.files?.Image) {
//         updateData.Image = `/uploads/blogs/${req.files.Image[0].filename}`;
//       }
//       if (req.files?.Image2) {
//         updateData.Image2 = `/uploads/blogs/${req.files.Image2[0].filename}`;
//       }
//       if (req.files?.bgImage) {
//         updateData.bgImage = `/uploads/blogs/${req.files.bgImage[0].filename}`;
//       }

//       const updatedBlog = await BlogModal.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         { new: true }
//       );

//       res.json(updatedBlog);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// );
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "CoverImage", maxCount: 1 },
    { name: "Image", maxCount: 1 },
    { name: "Image2", maxCount: 1 },
    { name: "bgImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const blog = await BlogModal.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      const updateData = { ...req.body };

      // helper to delete old image
      const deleteFile = (filePath) => {
        if (!filePath) return;
        const fullPath = path.join(__dirname, "..", filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      };

      if (req.files?.CoverImage) {
        deleteFile(blog.CoverImage);
        updateData.CoverImage = `/uploads/blogs/${req.files.CoverImage[0].filename}`;
      }

      if (req.files?.Image) {
        deleteFile(blog.Image);
        updateData.Image = `/uploads/blogs/${req.files.Image[0].filename}`;
      }

      if (req.files?.Image2) {
        deleteFile(blog.Image2);
        updateData.Image2 = `/uploads/blogs/${req.files.Image2[0].filename}`;
      }

      if (req.files?.bgImage) {
        deleteFile(blog.bgImage);
        updateData.bgImage = `/uploads/blogs/${req.files.bgImage[0].filename}`;
      }

      const updatedBlog = await BlogModal.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// DELETE a Blog by ID
// router.delete("/:id", protect, adminOnly, async (req, res) => {
//   await BlogModal.findByIdAndDelete(req.params.id);
//   res.json({ message: "Blog deleted successfully" });
// });
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const blog = await BlogModal.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const images = [
      blog.CoverImage,
      blog.Image,
      blog.Image2,
      blog.bgImage,
    ];

    images.forEach((img) => {
      if (img) {
        const filePath = path.join(
          __dirname,
          "..",
          img
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    await blog.deleteOne();
    res.json({ message: "Blog and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
