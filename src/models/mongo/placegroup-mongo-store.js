import Mongoose from "mongoose";
import { Placegroup } from "./placegroup.js";
import { placeMongoStore } from "./place-mongo-store.js";

export const placegroupMongoStore = {
  async getAllPlacegroups() {
    const placegroups = await Placegroup.find().lean();
    return placegroups;
  },

  async getPlacegroupById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const placegroup = await Placegroup.findOne({ _id: id }).lean();
      if (placegroup) {
        placegroup.places = await placeMongoStore.getPlacesByPlacegroupId(placegroup._id);
      }
      return placegroup;
    }
    return null;
  },

  async addPlacegroup(placegroup) {
    const newPlacegroup = new Placegroup(placegroup);
    const placegroupObj = await newPlacegroup.save();
    return this.getPlacegroupById(placegroupObj._id);
  },

  async getUserPlacegroups(id) {
    const placegroup = await Placegroup.find({ userid: id }).lean();
    return placegroup;
  },

  async deletePlacegroupById(id) {
    try {
      await Placegroup.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacegroups() {
    await Placegroup.deleteMany({});
  },
};
