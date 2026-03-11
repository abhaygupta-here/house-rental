const router = require("express").Router();
const House = require("../models/House");
const auth = require("../middleware/authMiddleware");

router.post("/add", auth, async (req, res) => {
  try {
    const house = new House(req.body);
    await house.save();
    res.json("House added");
  } catch (err) {
    res.json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {

    const house = await House.findById(req.params.id);

    if (!house) {
      return res.json("House not found");
    }

    if (house.ownerId !== req.userId) {
      return res.json("Not allowed");
    }

    await House.findByIdAndDelete(req.params.id);

    res.json("House deleted");

  } catch (err) {
    res.json(err);
  }
});

// GET MY HOUSES
router.get("/my", auth, async (req, res) => {
  try {

    const houses = await House.find({
      ownerId: req.userId,
    });

    res.json(houses);

  } catch (err) {
    res.json(err);
  }
});

module.exports = router;