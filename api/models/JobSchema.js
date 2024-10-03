import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    company: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
