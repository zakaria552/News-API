const {selectCommentsByArticleid, updateComment} = require("../models/comments.model")
exports.getCommentsByArticleid = (req, res, next) => {
    selectCommentsByArticleid(req.params.article_id).then((comments) => {
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}

exports.patchComment = (req, res, next) => {
    updateComment(req.params.comment_id, req.body).then((comment) => {
        res.status(200).send({comment})
    }).catch((err) => {
        console.log(err)
        next(err)
    })
}