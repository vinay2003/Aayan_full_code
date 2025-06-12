import { Testimonial } from '../models/testimonialModel.js';

// GET all testimonials
export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
};

// CREATE new testimonial
export const addTestimonial = async (req, res) => {
  const { name, role, message, active } = req.body;
  const testimonial = await Testimonial.create({ name, role, message, active });
  res.status(201).json(testimonial);
};

// UPDATE testimonial
export const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// DELETE testimonial
export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  await Testimonial.findByIdAndDelete(id);
  res.json({ message: 'Testimonial deleted successfully' });
};
