const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле `email` является обязательным'],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Поле `email` должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле `password` является обязательным'],
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
