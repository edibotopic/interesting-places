import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(placegroupId, place) {
    await db.read();
    place._id = v4();
    place.placegroupid = placegroupId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByPlacegroupId(id) {
    await db.read();
    let p = db.data.places.filter((place) => place.placegroupid === id);
    if (p === undefined) t = null;
    return p;
  },

  async getPlaceById(id) {
    await db.read();
    let p = db.data.places.find((place) => place._id === id);
    if (p === undefined) p = null;
    return p;
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.artist = updatedPlace.location;
    place.duration = updatedPlace.rating;
    await db.write();
  },
};
