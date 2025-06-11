import Contact from "../models/Contact.js";
import axios from "axios";

// POST /api/contact/send
const contactForm = async (req, res) => {
  try {
    const { name, email, message, captcha } = req.body;

    if (!name || !email || !message || !captcha) {
      return res.status(400).json({ error: "All fields (name, email, message, captcha) are required." });
    }

    // Optional reCAPTCHA (commented out for local testing)
    // const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    // const params = new URLSearchParams();
    // params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    // params.append("response", captcha);
    // const { data } = await axios.post(verifyUrl, params);
    // if (!data.success) {
    //   return res.status(403).json({ error: "reCAPTCHA verification failed." });
    // }

    await Contact.create({ name, email, message });
    return res.status(201).json({ message: "Your message was sent successfully!" });
  } catch (err) {
    console.error("Error in contactForm:", err.message || err);
    return res.status(500).json({ error: "Something went wrong. Try again later." });
  }
};

// GET /api/contact/all
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch contact messages." });
  }
};

// DELETE /api/contact/:id
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Contact message not found." });
    }
    return res.status(200).json({ message: "Message deleted successfully." });
  } catch (err) {
    console.error("Error deleting contact message:", err.message || err);
    return res.status(500).json({ error: "Failed to delete contact message." });
  }
};

export { contactForm, getAllContacts, deleteContact };
