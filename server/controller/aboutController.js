import { About } from '../models/About.js';

export const getAboutContent = async (req, res) => {
  const about = await About.findOne();
  if (!about) return res.status(404).json({ message: 'About content not found' });
  res.json(about);
};

export const updateAboutContent = async (req, res) => {
  const { content } = req.body;
  let about = await About.findOne();

  if (about) {
    about.content = content;
    await about.save();
  } else {
    about = await About.create({ content });
  }

  res.json({ message: 'About content updated', about });
};
