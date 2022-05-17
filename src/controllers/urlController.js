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


const getUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode
        let getData = await urlModel.findOne({ urlCode: urlCode })
        let { longUrl } = getData
        return res.status(200).redirect(longUrl)
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { createShortUrl, getUrl }