import express from 'express';
import { getAboutContent, updateAboutContent } from '../controllers/aboutController.js';

const router = express.Router();

router.get('/about', getAboutContent);
router.put('/about', updateAboutContent);

export default router;
