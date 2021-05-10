import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Subject",
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export { Teacher as default };
