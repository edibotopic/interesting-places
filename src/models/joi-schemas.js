import Joi from "joi";

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlaceSpec = {
  name: Joi.string().required(),
  location: Joi.string().required(),
  rating: Joi.number().allow("").optional(),
};

export const PlacegroupSpec = {
  name: Joi.string().required(),
};
