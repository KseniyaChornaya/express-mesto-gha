const Card = require('../modules/card');

exports.getCard = (req, res) =>
  (Card.exports.createCard = (req, res) =>
    Card.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    })
      .then((card) => {
        res.send(card);
      })
      .catch((err) => res.status(400).send(err)));
