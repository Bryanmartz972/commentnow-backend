const Joi = require('joi')

const authSchema = Joi.object({
  names: Joi.string().min(3).max(70).trim().required(),
  username: Joi.string().min(3).max(20).required().trim(),
  email: Joi.string().email().lowercase().required().trim(),
  description: Joi.string().max(100).trim(),
  password: Joi.string().min(5).required().trim(),
  birthdate: Joi.date().greater('1950-1-1').less('now').iso().required(),
  recoveryQuestion: Joi.string().min(5).max(50).required().trim(),
  recoveryAnswer: Joi.string().max(50).required().trim()
})

const validateEmail = Joi.string().email().lowercase().required().trim()

const validateUsername = Joi.string().min(3).max(20).required().trim()

const validatePassword = Joi.string().min(5).required().trim()

module.exports = { authSchema, validateEmail, validateUsername, validatePassword }