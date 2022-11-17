const {sendEndPoints} = require("../models/api.model")

exports.getApi = (req, res, next) => {
    console.log("controller")
    sendEndPoints().then((content) => {
        res.status(200).send({endpoints: content})
    })
}