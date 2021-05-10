import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      ref: "Question",
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

export { Question as default };
