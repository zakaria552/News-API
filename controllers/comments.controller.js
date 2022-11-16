const {selectCommentsByArticleid, createCommentByArticleid, removeComment} = require("../models/comments.model")
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
        next(err)
    })
}
exports.deleteComment = (req, res, next) => {
    removeComment(req.params.comment_id).then(() => {
        res.status(204).send({})
    }).catch((err) => {
        next(err)
    })
}