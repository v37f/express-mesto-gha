const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле `email` является обязательным'],
    unique: [true, 'Пользователь с таким email уже существует'],
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле `password` является обязательным'],
  },
  name: {
    type: String,
    required: [true, 'Поле `name` является обязательным'],
    minlength: [2, 'Минимальная длина поля `name` 2 символа'],
    maxlength: [30, 'Максимальная длина поля `name` 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле `about` является обязательным'],
    minlength: [2, 'Минимальная длина поля `about` 2 символа'],
    maxlength: [30, 'Максимальная длина поля `about` 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле `avatar` является обязательным'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
