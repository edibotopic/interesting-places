import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placegroupController = {
  index: {
    handler: async function(request, h) {
      const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
      const viewData = {
        name: "Placegroup",
        placegroup: placegroup,
      };
      return h.view("placegroup-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("placegroup-view", { name: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function(request, h) {
      const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
      const newPlace = {
        name: request.payload.name,
        location: request.payload.location,
        rating: Number(request.payload.rating),
        img: request.payload.img,
      };
      await db.placeStore.addPlace(placegroup._id, newPlace);
      return h.redirect(`/placegroup/${placegroup._id}`);
    },
  },

  deletePlace: {
    handler: async function(request, h) {
      const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/placegroup/${placegroup._id}`);
    },
  },
};
