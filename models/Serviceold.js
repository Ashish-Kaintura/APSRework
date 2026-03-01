// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema({
//   title: { type: String, required: true, unique: true },
//   description: String,
//   bgImage: String,
//   link: String,
// }, { timestamps: true });

// module.exports = mongoose.model("Service", serviceSchema);
const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  CoverImage: String,
  img: String,
  intro: String,
  description: String,
  shortdescription: String,
  longdescription: String,
  bgImage: String,
});

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    intro: String,
    description: String,
    shortdescription: String,
    longdescription: String,
    CoverImage: String,
    bgImage: String,
    img: String,
    url: String,
    metacanonical: String,
    metatitle: String,
    metadescription: String,
    metakeywords: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    SubServices: [subServiceSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
