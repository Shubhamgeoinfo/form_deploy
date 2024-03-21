import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      sparse: true,
    },
    language: {
      type: String,
      required: true,
    },
    stdin: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    stdout: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("formdata", userSchema);
