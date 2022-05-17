const express = require("express");
const router = express.Router();
const {createShortUrl,getUrl} =require('../controllers/urlController')


router.all("/", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});


router.post('/url/shorten', createShortUrl)
router.get('/:urlCode', getUrl)

module.exports = router;
