const db = require("../db/connection")
exports.selectArticles = () => {
    const queryStr = `
        SELECT articles.author, title, articles.article_id, topic, articles.created_at, 
        articles.votes, COUNT(comments.article_id) as comment_count FROM articles
        LEFT JOIN comments
            ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.article_id;
    `
    return db.query(queryStr).then((results) => {
        return results.rows
    })
}
exports.selectArticleById = (article_id) => { 
    const queryStr = `SELECT author, title, article_id, body, topic, created_at, votes
        FROM articles WHERE article_id = $1;`
    return db.query(queryStr, [article_id]).then((results) => {
        if(!results.rows.length) return Promise.reject({"status": 404, msg: "article not found!"})
        return results.rows[0]
    })
}
exports.updateArticle = (article_id, obj) => {
    return this.selectArticleById(article_id).then(() => {
        const queryStr = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`
        return db.query(queryStr, [obj.inc_votes, article_id])
    }).then((result) => {
        return result.rows[0]
    })
}