const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(6)
    .required()
})

const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const { error } = schema.validate({firstName, lastName, email, password})

  if(error) return res.status(400).json({
    "error": true,
    "message": "O campo 'password' deve ter pelo menos 6 caracteres"
  });

  next();
}

module.exports = {
  validateUser,
}