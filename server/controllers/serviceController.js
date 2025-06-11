const Service = require('../models/Service');

// GET all services
exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

// ADD new service
exports.addService = async (req, res) => {
  const { title, description, active } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const service = new Service({ title, description, imageUrl, active });
  await service.save();
  res.status(201).json(service);
};

// UPDATE service
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, active } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

  const updated = await Service.findByIdAndUpdate(id, {
    title, description, imageUrl, active
  }, { new: true });

  res.json(updated);
};

// DELETE service
exports.deleteService = async (req, res) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);
  res.json({ message: 'Deleted successfully' });
};

// TOGGLE active status
exports.toggleStatus = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  const updated = await Service.findByIdAndUpdate(id, { active }, { new: true });
  res.json(updated);
};
