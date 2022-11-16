const db = require("../db/connection")
exports.selectArticles = (topic, sort_by = "created_at", order = "DESC") => {
    const validSort = ["author", "title", "article_id", "topic", "created_at", "votes", "comment_count"]
    const validOrder = ["DESC", "ASC"]
    let  queryStr = `SELECT articles.author, title, articles.article_id, topic, articles.created_at, 
        articles.votes, COUNT(comments.article_id) as comment_count FROM articles
        LEFT JOIN comments
            ON articles.article_id = comments.article_id
        `
    const queryValues = []
    if(topic) queryStr += ` WHERE topic = '${topic}'`
    if(!validSort.includes(sort_by)) {
        queryValues.push('created_at')
    } else {
        queryValues.push(sort_by)
    }
    !validOrder.includes(order) ? queryValues.push("DESC"): queryValues.push(order)
    queryStr += `
     GROUP BY articles.article_id 
     ORDER BY ${queryValues[0]} ${queryValues[1]};
    `
    console.log(queryStr)
    return db.query(queryStr).then((results) => {
        console.log(results.rows)
        if(!results.rows.length) return Promise.reject({"status": 400, "msg": "bad request!"})
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