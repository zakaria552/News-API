const {selectTopics} = require("../models/topics.model")
exports.getTopics = (req, res) => {
    return selectTopics().then((topics) => {
        res.status(200).send(topics)
    })
}