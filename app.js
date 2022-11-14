const express = require("express")
const app = express()
const {getTopics} = require("./controllers/topics.controller")
const {getArticles, getCommentsByArticleid} = require("./controllers/articles.controller")

app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticleid)
app.all("/*", (req, res) => {
    res.status(404).send({msg: "route not found!"})
})

app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.msg})
})
module.exports = app