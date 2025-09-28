import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    serial: {
      type: Number,
      required: false,
      unique: true,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    showHome: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
    validateBeforeSave: true,
  }
);

// export default mongoose.model("Blog", BlogSchema);
const BlogModel = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);
export default BlogModel;
