const urlModel = require("../models/urlModel");
const { nanoid } = require('nanoid');
const isUrl = require('is-url')

const createShortUrl = async function (req, res) {
    try {

        //Getting original url from user
        let longUrl = req.body.longUrl;

        //Validating url
        if(!isUrl(longUrl)) return res.status(400).send({ status: false, message: `${longUrl} is not a valid url` })

        //Generating unique url code
        let urlCode = longUrl.trim().slice(1, 3) + nanoid();

        //Checking uniqueness of url in database
        let isUniqueUrlCode = await urlModel.findOne({ urlCode: urlCode })
        if (isUniqueUrlCode) return res.status(400).send({ status: false, message: `${urlCode} is already exist` })

        //Generating short url using base url plus urlCode
        let shortUrl = "localhost:3000/" + urlCode;

        //Saving data in database
        let saveData = { longUrl, shortUrl, urlCode }
        let saveUrl = await urlModel.create(saveData)

        let result = {
            longUrl: saveUrl.longUrl,
            shortUrl: saveUrl.shortUrl,
            urlCode: saveUrl.urlCode
        }
        return res.status(200).send({ data: result })
    }
    catch (err) {
        res.status(500).send({ msg: "Internal Server Error", error: err.message });
    }
}


const redirect2LongUrl = async function (req, res) {
    try {

        let urlCode = req.params.urlCode;

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