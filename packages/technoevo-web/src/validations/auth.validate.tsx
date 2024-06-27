import { validatePhoneNumber } from '@/helpers/validatePhoneNumber';
import Joi from 'joi';
import {
  email,
  firstname,
  lastname,
  otp,
  password,
  passwordConfirm,
  passwordCurrent,
} from './validateAttributes';

export const UserValidation = {
  loginSchema: Joi.object()
    .keys({
      email,
      password,
    })
    .options({ abortEarly: true }),
  registerSchema: Joi.object()
    .keys({
      email,
      firstname,
      lastname,
      phone: Joi.object({
        number: Joi.string().required(),
        code: Joi.string().required(),
      })
        .custom(validatePhoneNumber, 'custom phone validation')
        .messages({
          'string.empty': `phone can't be an empty field`,
          'any.required': `phone is a required field.`,
          'any.custom': `Invaild phone number for seletced code`,
        }),
      password,
    })
    .options({ abortEarly: false }),
  changePassword: Joi.object()
    .keys({
      password,
      passwordConfirm,
      passwordCurrent,
    })
    .options({ abortEarly: false }),
  foregtPassowrd: Joi.object()
    .keys({
      email,
    })
    .options({ abortEarly: false }),
  verifyOTP: Joi.object()
    .keys({
      otp,
    })
    .options({ abortEarly: false }),
  resetPassword: Joi.object()
    .keys({
      password,
      passwordConfirm,
    })
    .options({ abortEarly: false }),
};
