import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

export { Subject as default };
