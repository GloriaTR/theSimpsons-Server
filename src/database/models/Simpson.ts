import { Schema, model } from "mongoose";

const simpsonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

const Simpson = model("Simpson", simpsonSchema, "simpsons");

export default Simpson;
