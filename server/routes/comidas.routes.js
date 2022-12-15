const express = require('express');
const router = express.Router();
const comidaController = require('../controllers/comidas.controller');



router.get('/', comidaController.getComida);
router.get('/:id', comidaController.getOne);
router.post('/', comidaController.createComida);
router.put('/:id', comidaController.updateComida);
router.delete('/:id', comidaController.deleteComida);


module.exports = router;