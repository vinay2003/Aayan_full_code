import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;
