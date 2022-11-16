const {selectArticles, selectArticleById, updateArticle} = require("../models/articles.model")
exports.getArticles = (req, res) => {
    return selectArticles().then((articles) => {
        res.status(200).send(articles)
    })
}
exports.getArticleById = (req, res, next) => {
    const article_id = req.params.article_id
    selectArticleById(article_id).then(({article, comment_count}) => {
        console.log(article, comment_count)
        res.status(200).send({article, comment_count})
    }).catch((err) => {
        next(err)
    })
}
exports.patchArticle = (req, res, next) => {
    return updateArticle(req.params.article_id, req.body).then((updatedArticle) => {
        res.status(200).send({updatedArticle})
    }).catch((err) => {
        next(err)
    })
}