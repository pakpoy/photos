const router = require("express").Router();
const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");

router.get("/all", async function (req, res) {
  try {
    const photos = await Photo.find().sort({datePhotographedUTC: 'desc'})
    console.log(photos);
    res.json(photos)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

const folder = path.resolve(__dirname, "../../", "./thumbs");
console.log(folder);

router.get("/:image/thumb.webp", async function (req, res) {
  try {
    res.sendFile(path.join(folder, `${req.params.image}.webp`));
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/:image", async function (req, res) {
  try {
    const photo = Photo.findById(req.params.image);
    res.json(photo);
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;