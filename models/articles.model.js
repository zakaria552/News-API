const db = require("../db/connection")
exports.selectArticles = () => {
    const queryStr = `
        SELECT articles.author, title, articles.article_id, topic, articles.created_at, 
        articles.votes, COUNT(comments.article_id) as comment_count FROM articles
        JOIN comments
            ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.article_id;
    `
    return db.query(queryStr).then((results) => {
        return results.rows
    })
}
exports.selectCommentsByArticleid = (article_id) => {
    if(isNaN(parseInt(article_id))) return Promise.reject({status: 400, msg: "bad request!"})
    const queryStr = `SELECT comment_id, votes, created_at, author,
    body FROM comments WHERE article_id = $1;
    `
    return db.query(queryStr, [article_id]).then((results) => {
        if(results.rows.length === 0) return Promise.reject({status: 404, msg: "article not found!"})
        return results.rows
    })
}