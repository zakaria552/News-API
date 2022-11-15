const {selectTopics, selectArticles, selectCommentsByArticleid} = require("../models/articles.model")

exports.getArticles = (req, res) => {
    return selectArticles().then((articles) => {
        res.status(200).send(articles)
    })
}
exports.getCommentsByArticleid = (req, res, next) => {
    selectCommentsByArticleid(req.params.article_id).then((comments) => {
        res.status(200).send(comments)
    }).catch((err) => {
        next(err)
    })
}