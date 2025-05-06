const express = require("express");
const router = express.Router();
const StudyMaterial = require("../models/StudyMaterial");
const MockTest = require("../models/MockTest");
const Progress = require("../models/Progress");


router.get("/study-materials", async (req, res) => {
  try {
    const materials = await StudyMaterial.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/mock-tests", async (req, res) => {
  try {
    const tests = await MockTest.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/progress/:userId", async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/study-materials", async (req, res) => {
    try {
      const material = new StudyMaterial(req.body);
      await material.save();
      res.status(201).json(material);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });




module.exports = router;
