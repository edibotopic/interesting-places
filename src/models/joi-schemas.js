import Joi from "joi";

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object().description("a valid ID"));

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

// BUG: the empty string for number types returns 0
// BUG: if input is invalid, user is taken to a non-functional input screen
export const PlaceSpec = Joi.object()
  .keys({
    name: Joi.string().example("Odd lighthouse").required(),
    location: Joi.string().example("Parts unknown").required(),
    description: Joi.string().allow("I found this at a beach").optional(),
    lat: Joi.number().example("30").allow(null, "").optional().min(-90).max(90),
    long: Joi.number().example("60").allow(null, "").optional().min(-180).max(180),
    rating: Joi.number().example("5").allow(null, "").optional().min(0).max(5),
    img: Joi.string().example("").allow("").optional(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("PlaceDetails")

export const PlaceArray = Joi.array().items(PlaceSpec).label("PlaceArray");

export const PlacegroupSpec = Joi.object()
  .keys({
    name: Joi.string().example("Summer Holiday").required(),
    date: Joi.string()
      .pattern(/^(0[1-9]|1[0-2])-\d{4}$/) // Enforce MM-YYYY format
      .example("06-2025")
      .optional()
      .allow(""),
    summary: Joi.string().example("Spanish holiday 2025").allow("").optional(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("PlacegroupDetails")

export const PlaceGroupArray = Joi.array().items(PlacegroupSpec).label("PlaceGroupArray");
