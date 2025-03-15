import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placegroupSchema = new Schema({
  name: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placegroup = Mongoose.model("Placegroup", placegroupSchema);
