const { Schema, model, SchemaTypes } = require("mongoose");

const techSchema = new Schema(
  {
    question: String,
    questionId: Number,
    answers: Array,
    rightAnswer: String,
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const QuestionSchema = model("tech", techSchema);
module.exports = QuestionSchema;
