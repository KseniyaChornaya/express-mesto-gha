const User = require('../modules/user');

exports.createUser = (req, res) =>
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
