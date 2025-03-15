import { v4 } from "uuid";
import { placeMemStore } from "./place-mem-store.js";

let placegroups = [];

export const placegroupMemStore = {
  async getAllPlacegroups() {
    return placegroups;
  },

  async addPlacegroup(placegroup) {
    placegroup._id = v4();
    placegroups.push(placegroup);
    return placegroup;
  },

  async getPlacegroupById(id) {
    const list = placegroups.find((placegroup) => placegroup._id === id);
    if (list) {
      list.places = await placeMemStore.getPlacesByPlacegroupId(list._id);
      return list;
    }
    return null;
  },

  async getUserPlacegroups(userid) {
    return placegroups.filter((placegroup) => placegroup.userid === userid);
  },

  async deletePlacegroupById(id) {
    const index = placegroups.findIndex((placegroup) => placegroup._id === id);
    if (index !== -1) placegroups.splice(index, 1);
  },

  async deleteAllPlacegroups() {
    placegroups = [];
  },
};
