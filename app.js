const express = require("express")
const app = express()
const {getTopics} = require("./controllers/topics.controller")
const {getArticles, getArticleById} = require("./controllers/articles.controller")

app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)

app.all("/*", (req, res) => {
    res.status(404).send({msg: "route not found!"})
})
app.use((err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({"msg":err.msg})
    } else {
        next()
    }
})
app.use((err, req, res, next) => {
    res.status(500).send({msg: "server error!"})
})
module.exports = app