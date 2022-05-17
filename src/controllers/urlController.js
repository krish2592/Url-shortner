const urlModel = require("../models/urlModel");

const createShortUrl = async function (req, res) {};

const redirect2LongUrl = async function (req, res) {
  try {
    shortUrl = req.params.urlCode;

    // if url (shortUrl) is not entered
    if (!shortUrl) {
      return res.status(400).send({
        status: false,
        message: "please enter url(shortUrl)",
      });
    }

    let Doc = await urlModel.findOne({ shortUrl: shortUrl });

    // if shortUrl does not exist (in our database)
    if (!Doc) {
      return res.status(404).send({ status: false, message: "url not found" });
    }

    res.redirect(302, Doc.longUrl);
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error", error: err.message });
  }
};

module.exports = { createShortUrl, redirect2LongUrl };
