const db = require("../db/connection")
exports.selectArticles = (topic, sort_by = "created_at", order = "desc") => {
    const validSort = ["author", "title", "article_id", "topic", "created_at", "votes", "comment_count"]
    const validOrder = ["desc", "asc"]
    const queryPromises = []
    let  queryStr = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, 
        articles.votes, COUNT(comments.article_id) as comment_count FROM articles
        LEFT JOIN comments
            ON articles.article_id = comments.article_id
        `
    const queryValues = []
    if(topic) {
        queryStr += ` WHERE topic = '${topic}'`
        queryPromises.push(db.query("SELECT * FROM topics WHERE slug = $1", [topic]))
    }
        
    if(!validSort.includes(sort_by)) return Promise.reject({"status": 400, "msg": "invalid sort query!"})
    if(!validOrder.includes(order)) return Promise.reject({"status": 400, "msg": "invalid order query!"})
    queryStr += ` 
     GROUP BY articles.article_id 
     ORDER BY ${sort_by} ${order};
    `
    queryPromises.push(db.query(queryStr, queryValues))
    return Promise.all(queryPromises).then((values) => {
        if(!topic) {
            const selectArticles = values[0]
            return selectArticles.rows
        }
        const [selectTopic, selectArticles] = values

        if(!selectTopic.rows.length) return Promise.reject({status: 400, msg: "invalid topic query!"})
        return selectArticles.rows
    })
}
exports.selectArticleById = (article_id) => {
    const promises = []
    const queryStr = `SELECT author, title, article_id, body, topic, created_at, votes
        FROM articles WHERE article_id = $1;`
    promises.push(db.query("SELECT COUNT(comment_id) FROM comments WHERE article_id = $1", [article_id]))
    promises.push(db.query(queryStr,[article_id]))
    return Promise.all(promises).then((values) => {
        if(!values[1].rows.length) return Promise.reject({"status": 404, msg: "article not found!"})
        const [comment_count, article] = values
        article.rows[0].comment_count = comment_count.rows[0].count
        return article.rows[0]
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