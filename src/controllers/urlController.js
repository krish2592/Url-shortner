const { nanoid } = require('nanoid')
const urlModel = require("../models/urlModel");
const { isValid } = require('../utilities/validator');

const createShortUrl = async function (req, res) {
    let longUrl = req.body.longUrl;
    if(!isValid(longUrl)) return res.status(400).send({status:false, message:"Url is required"})
    let urlCode = longUrl.slice(1, 3)+nanoid();
    let shortUrl = "localhost:3000/" + urlCode;
    let saveData = { longUrl, shortUrl, urlCode }
    let saveUrl = await urlModel.create(saveData)
    let result = {
        longUrl: saveUrl.longUrl,
        shortUrl: saveUrl.shortUrl,
        urlCode: saveUrl.urlCode
    }
    return res.status(200).send({ data: result })
}


const redirect2LongUrl = async function (req, res) {
    try {

      let  urlCode = req.params.urlCode;

      // if url (shortUrl) is not entered
      if(!isValid(urlCode)) return res.status(400).send({status:false, message:"Url code is required"})
      
      let getData = await urlModel.findOne({ urlCode: urlCode });
  
      // if Url does not exist (in our database)
      if (!getData) {
        return res.status(404).send({ status: false, message: "Url not found" });
      }
  
      res.redirect(302, getData.longUrl);
    } catch (err) {
      res.status(500).send({ msg: "Internal Server Error", error: err.message });
    }
  };

module.exports = { createShortUrl, redirect2LongUrl }