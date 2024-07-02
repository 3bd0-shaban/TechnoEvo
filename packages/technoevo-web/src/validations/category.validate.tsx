import Joi from 'joi';
import { category } from './validateAttributes';

export const categoryValidations = {
  createCategory: Joi.object()
    .keys({
      category,
    })
    .options({ abortEarly: false }),
};
