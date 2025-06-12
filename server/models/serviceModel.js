import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Service = mongoose.model('Service', serviceSchema);
