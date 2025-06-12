import { Slider } from "../models/sliderModel.js";

export const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sliders" });
  }
};

export const createSlider = async (req, res) => {
  try {
    const { altText, active } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) return res.status(400).json({ message: "Image is required" });

    const newSlider = new Slider({ imageUrl, altText, active });
    await newSlider.save();
    res.status(201).json(newSlider);
  } catch (error) {
    res.status(500).json({ message: "Failed to create slider" });
  }
};

export const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { altText, active } = req.body;
    let imageUrl;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedSlider = await Slider.findByIdAndUpdate(
      id,
      { altText, active, ...(imageUrl && { imageUrl }) },
      { new: true }
    );

    res.json(updatedSlider);
  } catch (error) {
    res.status(500).json({ message: "Failed to update slider" });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    await Slider.findByIdAndDelete(id);
    res.json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete slider" });
  }
};
