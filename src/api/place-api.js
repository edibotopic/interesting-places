import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlaceSpec, PlacegroupSpec } from "../models/joi-schemas.js";

export const placeApi = {
  find: {
    auth: false,
    handler: async function(request, h) {
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
    },
  },

  create: {
    auth: false,
    handler: async function(request, h) {
    },
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
    },
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
    },
  },
};
