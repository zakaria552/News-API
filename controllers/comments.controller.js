const {selectCommentsByArticleid, createCommentByArticleid} = require("../models/comments.model")
exports.getCommentsByArticleid = (req, res, next) => {
    selectCommentsByArticleid(req.params.article_id).then((comments) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}

exports.postCommentByArticleid = (req, res, next) => {
    createCommentByArticleid(req.params.article_id, req.body).then((comment) => {
        res.status(201).send({comment})
    }).catch((err) => {
        console.log(err)
        next(err)
    })
}