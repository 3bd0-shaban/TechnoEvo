import Joi from 'joi';
import { blog_des, blog_Title, categories } from './validateAttributes';

export const blogValidations = {
  craeteBlogSchema: Joi.object()
    .keys({
      blog_des,
      blog_Title,
      categories,
    })
    .options({ abortEarly: false }),
};
