import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlacegroupSpec, PlaceGroupArray } from "../models/joi-schemas.js"
import { validationError } from "../utils/logger.js"

export const placegroupApi = {
  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const placegroups = await db.placegroupStore.getAllPlacegroups();
        return placegroups;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api", "placegroup"],
    description: "Get all placegroup data",
    notes: "Returns all placegroup data from placegroupAPI",
    response: { schema: PlaceGroupArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
        if (!placegroup) {
          return Boom.notFound("No Placegroup with this id");
        }
        return placegroup;
      } catch (err) {
        return Boom.serverUnavailable("No Placegroup with this id");
      }
    },
    tags: ["api", "placegroup"],
    description: "Get a specific placegroup",
    notes: "Returns details for a specific placegroup",
    response: { schema: PlacegroupSpec, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const placegroup = request.payload;
        const newPlacegroup = await db.placegroupStore.addPlacegroup(placegroup);
        if (newPlacegroup) {
          return h.response(newPlacegroup).code(201);
        }
        return Boom.badImplementation("error creating placegroup");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api", "placegroup"],
    description: "Create a new placegroup",
    notes: "Returns the newly created placegroup",
    validate: { payload: PlacegroupSpec, failAction: validationError },
    response: { schema: PlacegroupSpec, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
        if (!placegroup) {
          return Boom.notFound("No Placegroup with this id");
        }
        await db.placegroupStore.deletePlacegroupById(placegroup._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placegroup with this id");
      }
    },
    tags: ["api", "placegroup"],
    description: "Delete a placegroup",
    notes: "A placegroup is removed from InterestingPlaces",
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      try {
        await db.placegroupStore.deleteAllPlacegroups();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api", "placegroup"],
    description: "Delete all placegroups",
    notes: "All placegroups are removed from InterestingPlaces",
  },
};
