const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is working nicely");
});

module.exports = router;
