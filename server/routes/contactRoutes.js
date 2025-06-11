import express from "express";
import { contactForm, getAllContacts, deleteContact } from "../controllers/contactController.js"; // Named import

const router = express.Router();

router.post('/send', contactForm);
router.get('/all', getAllContacts);
router.delete('/:id', deleteContact);

export default router;
