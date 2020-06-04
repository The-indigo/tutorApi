const mongoose = require("mongoose");
const schema = mongoose.Schema;

const lessonSchema = new schema({
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      bookedBy:{
        type:String
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
