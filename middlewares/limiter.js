// Мидлвэйр, ограничивающий количество запросов с одного IP за определенное время
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000 * 60 * 15, // 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
