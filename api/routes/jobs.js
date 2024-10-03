import express from "express";
import { Job } from "../models/JobSchema.js";
const jobRoute = express.Router();

// CREATE a new job
jobRoute.post("/create", async (req, res) => {
  const { title, type, location, description, salary, company } = req.body;
  try {
    const newJob = new Job({
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: company.name,
        description: company.description,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
      },
    });
    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ (GET) a job by ID
jobRoute.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE a job by ID
jobRoute.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a job by ID
jobRoute.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found!" });
    }
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json("Job has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL JOBS
jobRoute.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { jobRoute };
