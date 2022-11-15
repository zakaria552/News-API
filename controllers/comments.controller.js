const {selectCommentsByArticleid} = require("../models/comments.model")
exports.getCommentsByArticleid = (req, res, next) => {
    selectCommentsByArticleid(req.params.article_id).then((comments) => {
        console.log(comments)
        res.status(200).send({comments})
    }).catch((err) => {
        next(err)
    })
}