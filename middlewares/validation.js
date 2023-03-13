const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

module.exports.authValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.empty': 'Поле `email` должно быть заполнено',
        'string.email': 'Поле `email` должно содержать валидный email-адрес',
        'any.required': 'Поле `email` является обязательным',
      }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'string.empty': 'Поле `password` должно быть заполнено',
        'string.min': 'Поле `password` должно содержать минимум {#limit} символов',
        'any.required': 'Поле `password` является обязательным',
      }),
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Поле `name` должно содержать минимум {#limit} символа',
        'string.max': 'Поле `name` должно содержать максимум {#limit} символов',
      }),
    about: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Поле `about` должно содержать минимум {#limit} символа',
        'string.max': 'Поле `about` должно содержать максимум {#limit} символов',
      }),
    avatar: Joi.string()
      .pattern(URL_PATTERN)
      .messages({
        'string.pattern.base': 'Поле `avatar` должно содержать валидный URL-адрес',
      }),
  }).unknown(true),
});

module.exports.userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .alphanum()
      .length(24)
      .messages({
        'string.alphanum': 'ID пользователя может содержать только латниские буквы и цифры',
        'string.length': 'Длина ID пользователя должна составлять {#limit} символа',
      }),
  }),
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Поле `name` должно содержать минимум {#limit} символа',
        'string.max': 'Поле `name` должно содержать максимум {#limit} символов',
      }),
    about: Joi.string()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Поле `about` должно содержать минимум {#limit} символа',
        'string.max': 'Поле `about` должно содержать максимум {#limit} символов',
      }),
    avatar: Joi.string()
      .pattern(URL_PATTERN)
      .messages({
        'string.pattern.base': 'Поле `avatar` должно содержать валидный URL-адрес',
      }),
  }).unknown(true),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.min': 'Поле `name` должно содержать минимум {#limit} символа',
        'string.max': 'Поле `name` должно содержать максимум {#limit} символов',
        'any.required': 'Поле `name` является обязательным',
      }),
    link: Joi.string()
      .pattern(/https?:\/\/[a-z0-9-]+\.[a-z0-9]{2,}\/?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*/)
      .required()
      .messages({
        'string.pattern.base': 'Поле `link` должно содержать валидный URL-адрес',
        'any.required': 'Поле `link` является обязательным',
      }),
  }).unknown(true),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .alphanum()
      .length(24)
      .messages({
        'string.alphanum': 'ID карточки может содержать только латниские буквы и цифры',
        'string.length': 'Длина ID карточки должна составлять {#limit} символа',
      }),
  }),
});
