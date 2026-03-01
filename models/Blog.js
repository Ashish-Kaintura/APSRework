const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
    title: { type: String, required: true, unique: true, trim: true },

    // SEO-friendly slug (auto-generated or manual)
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    // ===== SEO FIELDS =====
    metacanonical: String,
    metatitle: String,
    metadescription: String,
    metakeywords: String,
    schemaMarkup: mongoose.Schema.Types.Mixed, // JSON-LD

    // ===== BLOG CONTENT =====
    shortdescription: String,
    longdescription: String,
    description: String,
    author: String,
    bgImage: String,
    Image: String,
    Image2: String,

    // ===== STATUS =====
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true }
);

/* =====================================================
   🔥 SMART SLUG GENERATION (AUTO + MANUAL SUPPORT)
===================================================== */

// Helper: Generate Unique Slug
async function generateUniqueSlug(model, baseSlug, currentId = null) {
  let slug = baseSlug;
  let counter = 1;

  while (
    await model.findOne({
      slug,
      ...(currentId && { _id: { $ne: currentId } }),
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}

// On Create / Save
BlogSchema.pre("save", async function (next) {
  try {
    const model = mongoose.models.Blog;

    // If user manually sets slug
    if (this.slug && this.isModified("slug")) {
      const baseSlug = slugify(this.slug, { lower: true, strict: true });
      this.slug = await generateUniqueSlug(model, baseSlug, this._id);
      return next();
    }

    // If no slug provided, generate from title
    if (!this.slug && this.title) {
      const baseSlug = slugify(this.title, { lower: true, strict: true });
      this.slug = await generateUniqueSlug(model, baseSlug, this._id);
    }

    next();
  } catch (err) {
    next(err);
  }
});

// On Update (findOneAndUpdate)
BlogSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const model = mongoose.models.Blog;
    const doc = await this.model.findOne(this.getQuery());

    if (!doc) return next();

    // If slug manually updated
    if (update.slug) {
      const baseSlug = slugify(update.slug, { lower: true, strict: true });
      update.slug = await generateUniqueSlug(model, baseSlug, doc._id);
    }

    // If title updated but slug not provided
    else if (update.title) {
      const baseSlug = slugify(update.title, { lower: true, strict: true });
      update.slug = await generateUniqueSlug(model, baseSlug, doc._id);
    }

    next();
  } catch (err) {
    next(err);
  }
});

// Index for performance
BlogSchema.index({ slug: 1, status: 1 });

module.exports = mongoose.model("Blog", BlogSchema);