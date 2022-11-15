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