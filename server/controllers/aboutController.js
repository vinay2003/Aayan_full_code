import About from "../models/About.js";

// GET - Get About Content
export const getAboutContent = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    if (!about) {
      return res.status(404).json({ message: "About content not found." });
    }
    return res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching about content:", error);
    return res.status(500).json({ error: "Failed to fetch about content." });
  }
};

// POST/PUT - Save or Update About Content
export const updateAboutContent = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required." });
    }

    // अगर कोई content पहले से मौजूद है, तो उसे update करें
    let about = await About.findOne();
    if (about) {
      about.content = content;
      await about.save();
    } else {
      about = await About.create({ content });
    }

    return res.status(200).json({ message: "About content saved successfully.", about });
  } catch (error) {
    console.error("Error saving about content:", error);
    return res.status(500).json({ error: "Failed to save about content." });
  }
};
