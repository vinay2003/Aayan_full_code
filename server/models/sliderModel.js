import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const Slider = mongoose.model("Slider", sliderSchema);
