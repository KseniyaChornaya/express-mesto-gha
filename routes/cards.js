const router = require('express').Router();
const {
  getCards,
  createCards,
  deleteCards,
  dislikeCard,
  likeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCards);
router.delete('/:cardId', deleteCards);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
