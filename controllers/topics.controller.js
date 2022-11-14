const {selectTopics, selectArticles} = require("../models/topics.model")
exports.getTopics = (req, res) => {
    return selectTopics().then((topics) => {
        res.status(200).send(topics)
    })
}
exports.getArticles = (req, res) => {
    return selectArticles().then((articles) => {

    })
}