const mongoose = require("mongoose");
const slugify = require("slugify");

const serviceSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
    title: { type: String, required: true, unique: true, trim: true },

    // path to an uploaded image (relative to `/uploads`)
    image: { type: String },


    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },

    // ===== SEO SECTION =====
    seo: {
      metaTitle: String,
      metaDescription: String,
      metaKeywords: String,
      metaCanonical: String,
      schemaMarkup: mongoose.Schema.Types.Mixed, // JSON-LD
    },

    // ===== HERO / BANNER SECTION =====
    banner: {
      order: { type: Number, default: 1 },
      portraitImage: String,
      bannerImage: String,
      bannerTitle: String,
      bannerKeyword: String,
      shortDescription: String,
      paragraph: String,
    },

    // ===== SHORT SUMMARY SECTION =====
    shortSummary: {
      order: { type: Number, default: 2 },
      title: String,
      paragraph1: String,
      paragraph2: String,
      image1:String,
      image2:String,
      
    },

    // ===== SERVICES SECTION =====
    servicesSection: {
      order: { type: Number, default: 3 },
      title: String,
      shortSummary: String,
      services: [
        {
          name: { type: String, required: true },
          icon: String,
        },
      ],
    },

    // ===== SPECIAL SERVICES =====
    specialServicesSection: {
      order: { type: Number, default: 4 },
      title: String,
      services: [
        {
          title: { type: String, required: true },
          description: String,
          icon: String,
        },
      ],
    },

    // ===== WHY US SECTION =====
    whyUsSection: {
      order: { type: Number, default: 5 },
      title: String,
      summary: String,
      points: [
        {
          title: { type: String, required: true },
          summary: String,
          icon: String,
        },
      ],
    },

    // ===== FAQ SECTION =====
    faqSection: {
      order: { type: Number, default: 6 },
      title: String,
      faqs: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },

    // ===== CTA SECTION =====
    ctaSection: {
      order: { type: Number, default: 7 },
      title: String,
      summary: String,
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
serviceSchema.pre("save", async function (next) {
  try {
    const model = mongoose.models.Service;

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
serviceSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const model = mongoose.models.Service;
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
serviceSchema.index({ slug: 1, status: 1 });

module.exports = mongoose.model("Service", serviceSchema);