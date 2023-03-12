const { celebrate, Joi } = require('celebrate');

module.exports.authValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.empty': 'Поле `email` должно быть заполнено',
        'string.email': 'Поле `email` должно содержать валидный email-адрес',
      }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({
        'string.empty': 'Поле `password` должно быть заполнено',
        'string.min': 'Поле `password` должно содержать минимум {#limit} символов',
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
      .pattern(/https?:\/\/[a-z0-9-]+\.[a-z0-9]{2,}\/?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*/)
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
        'string.length': 'Длина ID пользователя должна составлять 24 символа',
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
      .uri()
      .messages({
        'string.uri': 'Поле `avatar` должно содержать валидный URI-адрес',
      }),
  }).unknown(true),
});

module.exports.validateCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .alphanum()
      .length(24)
      .messages({
        'string.alphanum': 'ID карточки может содержать только латниские буквы и цифры',
        'string.length': 'Длина ID карточки должна составлять 24 символа',
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
    link: Joi.string()
      .uri()
      .messages({
        'string.uri': 'Поле `link` должно содержать валидный URI-адрес',
      }),
  }).unknown(true),
});
