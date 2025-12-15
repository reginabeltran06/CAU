import express from "express";
import Person from "../models/Person.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
