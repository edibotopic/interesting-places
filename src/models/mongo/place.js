import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  location: String,
  rating: Number,
  placegroupid: {
    type: Schema.Types.ObjectId,
    ref: "Placegroup",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
