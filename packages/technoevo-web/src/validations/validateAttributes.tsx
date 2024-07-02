import Joi from 'joi';

export const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required()
  .messages({
    'string.empty': 'Email cannot be left empty',
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is a required field',
  });

export const password = Joi.string().min(6).max(50).required().messages({
  'string.empty': 'Password cannot be left empty',
  'string.min': 'Password should be at least {#limit} characters long',
  'any.required': 'Password is a required field',
});
export const passwordCurrent = Joi.string().min(6).max(50).required().messages({
  'string.empty': 'Old password cannot be left empty',
  'string.min': 'Old password should be at least {#limit} characters long',
  'any.required': 'Old password is a required field',
});
export const passwordConfirm = Joi.string()
  .required()
  .valid(Joi.ref('password'))
  .messages({
    'string.empty': 'Confirm password cannot be left empty',
    'any.required': 'Confirm password is a required field',
    'any.only': 'Password and Confirm Password must match',
  });

export const firstname = Joi.string().required().messages({
  'string.empty': 'First name cannot be left empty',
  'any.required': 'First name is a required field',
});

export const lastname = Joi.string().required().messages({
  'string.empty': 'Last name cannot be left empty',
  'any.required': 'Last name is a required field',
});

export const number = Joi.string()
  .pattern(/^[0-9]+$/)
  .required()
  .messages({
    'string.pattern.base': 'Phone number must contain only digits',
    'string.empty': 'Phone number cannot be left empty',
    'any.required': 'Phone number is a required field',
  });

export const country = Joi.string().required().messages({
  'string.empty': 'Country cannot be left empty',
  'any.required': 'Country is a required field',
});

export const otp = Joi.string().min(6).required().messages({
  'string.min': 'otp should {#limit} numbers',
  'string.empty': 'otp cannot be left empty',
  // 'any.required': 'otp is a required field',
});

//Blog

export const blog_Title = Joi.string().required().messages({
  'string.empty': 'blog title cannot be left empty',
  'any.required': 'blog title is a required field',
});

export const blog_des = Joi.string().required().messages({
  'string.empty': 'blog describtion cannot be left empty',
  'any.required': 'blog describtion is a required field',
});

export const categories = Joi.array()
  .required()
  .items(Joi.number().required())
  .messages({
    'string.empty': 'categories cannot be left empty',
    'any.required': 'categories is a required field',
  });

//category

export const category = Joi.string().required().messages({
  'string.empty': 'category cannot be left empty',
  'any.required': 'category is a required field',
});
