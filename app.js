const express = require("express")
const app = express()
const {getTopics} = require("./controllers/topics.controller")
const {getArticles, getArticleById, patchArticle} = require("./controllers/articles.controller")
const {getCommentsByArticleid, postCommentByArticleid, deleteComment} = require("./controllers/comments.controller")

app.use(express.json())
app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getCommentsByArticleid)
app.post("/api/articles/:article_id/comments", postCommentByArticleid)
app.patch("/api/articles/:article_id", patchArticle)
app.delete("/api/comments/:comment_id", deleteComment)
app.all("/*", (req, res) => {
    res.status(404).send({msg: "route not found!"})
})
app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({"msg":err.msg})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    if(err.code === '22P02' || err.code === "23502" || err.code === "23503") {
        res.status(400).send({"msg": "bad request!"})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    res.status(500).send({msg: "server error!"})
})
module.exports = app