const {selectArticles, selectArticleById, updateArticle} = require("../models/articles.model")
exports.getArticles = (req, res) => {
    return selectArticles().then((articles) => {
        res.status(200).send(articles)
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
exports.patchArticle = (req, res, next) => {
    console.log(req.params.article_id)
    return updateArticle(req.params.article_id, req.body).then((updatedArticle) => {
        res.status(201).send({updatedArticle})
    }).catch((err) => {
        console.log(err)
        next(err)
    })
}