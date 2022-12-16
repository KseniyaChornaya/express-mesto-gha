const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const { default: mongoose } = require('mongoose');

module.exports.createUser = (req, res, next) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Невалидный формат id пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Отправлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userInfo = {
    name: req.body.name,
    about: req.body.about,
  };
  updateUser(req, res, next, userInfo);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userData = {
    avatar: req.body.avatar,
  };
  updateUser(req, res, next, userData);
};
