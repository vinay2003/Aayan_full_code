import express from 'express';
import {
  addSlider,
  getSliders,
  updateSlider,
  deleteSlider,
} from '../controllers/sliderController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.get('/', getSliders);
router.post('/', upload.single('image'), addSlider);
router.put('/:id', updateSlider);
router.delete('/:id', deleteSlider);

export default router;