import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { placeJsonStore } from "./place-json-store.js";

export const placegroupJsonStore = {
  async getAllPlacegroups() {
    await db.read();
    return db.data.placegroups;
  },

  async addPlacegroup(placegroup) {
    await db.read();
    placegroup._id = v4();
    db.data.placegroups.push(placegroup);
    await db.write();
    return placegroup;
  },

  async getPlacegroupById(id) {
    await db.read();
    let list = db.data.placegroups.find((placegroups) => placegroups._id === id);
    if (list) {
      list.places = await placeJsonStore.getPlacesByPlacegroupId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlacegroups(userid) {
    await db.read();
    return db.data.placegroups.filter((placegroup) => placegroup.userid === userid);
  },

  async deletePlacegroupById(id) {
    await db.read();
    const index = db.data.placegroups.findIndex((placegroup) => placegroup._id === id);
    if (index !== -1) db.data.placegroups.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacegroups() {
    db.data.placegroups = [];
    await db.write();
  },
};
