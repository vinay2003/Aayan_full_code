import Slider from '../models/Slider.js';
import cloudinary from '../config/cloudinary.js';

export const addSlider = async (req, res) => {
  try {
    const file = req.file;
    const { altText, active } = req.body;

    if (!file) return res.status(400).json({ error: 'Image file is required' });

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'sliders' },
      async (error, result) => {
        if (error) return res.status(500).json({ error: 'Cloudinary upload failed' });

        const slider = new Slider({
          imageUrl: result.secure_url,
          altText,
          active,
        });
        await slider.save();
        res.status(201).json(slider);
      }
    );

    file.stream.pipe(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSliders = async (req, res) => {
  const sliders = await Slider.find().sort({ createdAt: -1 });
  res.json(sliders);
};

export const updateSlider = async (req, res) => {
  const { id } = req.params;
  const { altText, active } = req.body;

  const updated = await Slider.findByIdAndUpdate(
    id,
    { altText, active },
    { new: true }
  );

  res.json(updated);
};

export const deleteSlider = async (req, res) => {
  const { id } = req.params;
  await Slider.findByIdAndDelete(id);
  res.json({ message: 'Slider deleted' });
};