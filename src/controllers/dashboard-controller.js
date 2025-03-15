import { PlacegroupSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function(request, h) {
      const loggedInUser = request.auth.credentials;
      const placegroups = await db.placegroupStore.getUserPlacegroups(loggedInUser._id);
      const viewData = {
        name: "Placegroup Dashboard",
        user: loggedInUser,
        placegroups: placegroups,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacegroup: {
    validate: {
      payload: PlacegroupSpec,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("dashboard-view", { name: "Add Placegroup error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function(request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlacegroup = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.placegroupStore.addPlacegroup(newPlacegroup);
      return h.redirect("/dashboard");
    },
  },

  deletePlacegroup: {
    handler: async function(request, h) {
      const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
      await db.placegroupStore.deletePlacegroupById(placegroup._id);
      return h.redirect("/dashboard");
    },
  },
};
