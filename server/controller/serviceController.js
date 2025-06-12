import { Service } from '../models/serviceModel.js';

// GET all services
export const getAllServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

// POST new service
export const createService = async (req, res) => {
  const { title, description, imageUrl, active } = req.body;
  const service = await Service.create({ title, description, imageUrl, active });
  res.status(201).json(service);
};

// PUT update service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedService);
};

// DELETE a service
export const deleteService = async (req, res) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);
  res.json({ message: 'Service deleted successfully' });
};
