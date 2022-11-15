const express = require("express")
const app = express()
const {getTopics} = require("./controllers/topics.controller")
const {getArticles} = require("./controllers/articles.controller")

app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)

app.all("/*", (req, res) => {
    res.status(404).send({msg: "route not found!"})
})
module.exports = app