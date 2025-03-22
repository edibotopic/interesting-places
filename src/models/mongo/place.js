import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  location: String,
  description: String,
  long: Number,
  lat: Number,
  rating: Number,
  img: String,
  placegroupid: {
    type: Schema.Types.ObjectId,
    ref: "Placegroup",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
