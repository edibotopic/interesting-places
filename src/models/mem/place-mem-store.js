import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addplace(placegroupId, place) {
    place._id = v4();
    place.placegroupid = placegroupId;
    places.push(place);
    return place;
  },

  async getPlacesByPlacegroupId(id) {
    return places.filter((place) => place.placegroupid === id);
  },

  async getPlaceById(id) {
    let foundPlace = places.find((place) => place._id === id);
    if (!foundPlace) {
      foundPlace = null;
    }
    return foundPlace;
  },

  async getPlaceGroupPlaces(placegroupId) {
    let foundPlaces = places.filter((place) => place.placegroupid === placegroupId);
    if (!foundPlaces) {
      foundPlaces = null;
    }
    return foundPlaces;
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.location = updatedPlace.location;
    place.rating = updatedPlace.rating;
  },
};
