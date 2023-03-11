const router = require("express").Router();
const jwt = require("jsonwebtoken")
const fs = require("fs");

const privateKey = fs.readFileSync(process.env.JWT_SIGNING_PRIVATE);

router.get("/", async function (req, res) {
  try {
    const token = await jwt.sign({ photos: true }, privateKey, {
      algorithm: "RS256",
      issuer: process.env.JWT_ISS,
      expiresIn: process.env.JWT_EXPIRY
    });
    return res.json({ token });
  } catch(err) {
    console.log(err)
    res.status(500).json({err: "Token signing failed"})
  }

})

module.exports = router;