const express = require("express");
const router = express.Router();
const {createShortUrl} =require('../controllers/urlController')


router.all("/*", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});


router.post('/url/shorten', createShortUrl)

module.exports = router;
