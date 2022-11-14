const {selectTopics, selectArticles} = require("../models/articles.model")
exports.getArticles = (req, res) => {
    return selectArticles().then((articles) => {
        res.status(200).send(articles)
    })
}