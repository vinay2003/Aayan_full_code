const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get('/', serviceController.getServices);
router.post('/', upload.single('imageUrl'), serviceController.addService);
router.put('/:id', upload.single('imageUrl'), serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.patch('/:id/status', serviceController.toggleStatus);

module.exports = router;
