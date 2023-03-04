const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле `name` является обязательным'],
    minlength: [2, 'Минимальная длина поля `name` 2 символа'],
    maxlength: [30, 'Максимальная длина поля `name` 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле `link` является обязательным'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
