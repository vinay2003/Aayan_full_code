const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleActiveStatus
} = require('../controllers/testimonialController');

router.get('/', getTestimonials);                
router.post('/', createTestimonial);             
router.put('/:id', updateTestimonial);           
router.delete('/:id', deleteTestimonial);        
router.patch('/:id/toggle', toggleActiveStatus); 

module.exports = router;
