import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlaceSpec, PlaceArray } from "../models/joi-schemas.js";
import { validationError } from "../utils/logger.js"

export const placeApi = {
  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api", "place"],
    response: { schema: PlaceArray, failAction: validationError },
    description: "Get all places",
    notes: "Returns all places",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No place with this id");
        }
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No place with this id");
      }
    },
    tags: ["api", "place"],
    description: "Find a place",
    notes: "Returns a place",
    response: { schema: PlaceSpec, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const place = await db.placeStore.addPlace(request.params.id, request.payload);
        if (place) {
          return h.response(place).code(201);
        }
        return Boom.badImplementation("error creating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api", "place"],
    description: "Create a place",
    notes: "Returns a newly created place",
    validate: { payload: PlaceSpec },
    response: { schema: PlaceSpec, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api", "place"],
    description: "Delete all places",
    notes: "All places are removed.",
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlace(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api", "place"],
    description: "Delete a place",
    notes: "A specific place is removed",
  },
}
