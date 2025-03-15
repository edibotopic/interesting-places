import Boom from "@hapi/boom";
import { PlacegroupSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

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
  },
};
