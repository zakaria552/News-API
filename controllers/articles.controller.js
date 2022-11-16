const {selectArticles, selectArticleById} = require("../models/articles.model")
const {isValidQuery} = require("../utils/utils2")
exports.getArticles = (req, res, next) => {
    const validQueries = ["topic", "sort_by", "order"]
    if(!isValidQuery(req.query, validQueries)) throw {status: 400, msg: "bad request!"}
    const {topic, sort_by, order} = req.query
    return selectArticles(topic, sort_by, order).then((articles) => {
        res.status(200).send({articles})
    }).catch((err) => {
        console.log(err)
        next(err)
    })
}
exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id
    selectArticleById(article_id).then((article) => {
        res.status(200).send(article)
    }).catch((err) => {
        next(err)
    })
}