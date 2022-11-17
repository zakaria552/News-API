const {selectArticleById} = require("./articles.model")
const db = require("../db/connection")
exports.selectCommentsByArticleid = (article_id) => {
    return selectArticleById(article_id).then(() => {
        const queryStr = `SELECT comment_id, votes, created_at, author,
        body FROM comments WHERE article_id = $1 ORDER BY comment_id DESC;
        `
        return db.query(queryStr, [article_id])
    }).then((results) => {
        return results.rows
    })
}

exports.createCommentByArticleid = (article_id, obj) => {
    return selectArticleById(article_id).then(() => {
        const queryStr = `INSERT INTO comments (body, author, article_id)
        VALUES ($1, $2, $3) RETURNING *;`
        return db.query(queryStr, [obj.body, obj.username, article_id ])
    }).then((result) => {
        return result.rows[0]
    })
}

exports.removeComment = (comment_id) => {
    return db.query("SELECT * FROM comments WHERE comment_id = $1;", [comment_id])
    .then((results) => {
        if(!results.rows.length) return Promise.reject({status: 404, msg: "comment not found!"})
        return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;", [comment_id])
    })
}