const {selectArticleById} = require("./articles.model")
const db = require("../db/connection")
exports.selectCommentsByArticleid = (article_id) => {
    return selectArticleById(article_id).then(() => {
        const queryStr = `SELECT comment_id, votes, created_at, author,
        body FROM comments WHERE article_id = $1;
        `
        return db.query(queryStr, [article_id])
    }).then((results) => {
        console.log(results.rows)
        return results.rows
    })
}