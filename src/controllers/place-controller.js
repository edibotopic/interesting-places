import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placeController = {
  index: {
    handler: async function(request, h) {
      const placegroup = await db.placegroupStore.getPlacegroupById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const viewData = {
        name: "Edit Place",
        placegroup: placegroup,
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("place-view", { name: "Edit place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function(request, h) {
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const newPlace = {
        name: request.payload.name,
        location: request.payload.location,
        description: request.payload.description,
        long: Number(request.payload.long),
        lat: Number(request.payload.lat),
        rating: Number(request.payload.rating),
        img: request.payload.img,
      };
      await db.placeStore.updatePlace(place, newPlace);
      return h.redirect(`/placegroup/${request.params.id}`);
    },
  },
};
