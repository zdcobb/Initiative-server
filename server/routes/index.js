const express = require('express');
const router = express.Router();
const charCtrl = require('../controllers/characters');
let db = require('../../db/db');


router.get('/', charCtrl.getAllCharacters);
router.get('/:id', charCtrl.getCharacter);
router.post('/', charCtrl.addCharacter);
router.put('/:id', charCtrl.updateCharacter);
router.delete('/:id', charCtrl.deleteCharacter);

module.exports = router;