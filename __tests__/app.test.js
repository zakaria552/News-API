const request = require("supertest")
const db = require("../db/connection")
const app = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")

beforeEach(() => seed(data))
afterAll(() => db.end())

describe("/*", () => {
    test(":( ALL 404 - returns route not found for all invalid end-points", () => {
        return request(app).get("/api/fdssdf").expect(404).then(({body}) => {
            expect(body.msg).toEqual("route not found!")
        })
    })
})

describe("/api/topics", () => {
    test(":) GET 200 - returns an array of topics with properties slug and describtion", () => {
        return request(app).get("/api/topics").expect(200).then(({body}) => {
            expect(body.length).not.toBe(0)
            body.forEach((topic) => {
                expect(topic).toEqual({
                    "slug": expect.any(String),
                    "description": expect.any(String)
                })
            })
        })
    })
})

describe("/api/articles", () => {
    test(":) GET 200 - returns an array of topics with properties slug and describtion", () => {
        return request(app).get("/api/articles").expect(200).then(({body}) => {
            body.forEach((article) => {
                expect(article).toEqual({
                    "author": expect.any(String),
                    "title": expect.any(String),
                    "article_id": expect.any(Number),
                    "topic": expect.any(String),
                    "created_at": expect.any(String),
                    "votes" : expect.any(Number),
                    "comment_count": expect.any(String)
                })
            })
        })
    })
})
describe("api/articles/:article_id", () => {
    test(":) GET 200 - returns article given the article id", () => {
        return request(app).get("/api/articles/3").expect(200).then(({body}) => {
            expect(Object.keys(body).length).toBe(7)
            expect(body).toEqual({
                "author" : expect.any(String),
                "title": expect.any(String),
                "article_id" : 3,
                "body" : expect.any(String),
                "topic": expect.any(String),
                "created_at": expect.any(String),
                "votes" : expect.any(Number)
            })
        })
    })
    test(":( GET 400 - returns bad request given invalid ID", () => {
        return request(app).get("/api/articles/dfs").expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
    test(":( GET 404 - returns bad request given non-existent article_id", () => {
        return request(app).get("/api/articles/300").expect(404).then(({body}) => {
            expect(body.msg).toBe("article not found!")
        })
    })
})
describe("/api/articles/:article_id/comments", () => {
    test(":) GET 200 - returns all the comments given article id", () => {
        return request(app).get("/api/articles/3/comments").expect(200).then(({body}) => {
            const comments = [{
                "comment_id" : 10,
                "votes" : 0,
                "created_at" : expect.any(String),
                "author": "icellusedkars", 
                "body": "git push origin master"
            },{
                "comment_id" : 11,
                "votes" : 0,
                "created_at" : expect.any(String),
                "author": "icellusedkars", 
                "body": "Ambidextrous marsupial"
            }]
            expect(body).toEqual({comments})
        })
    })
    test(":) GET 200 - returns empty array of comments given article id have no comments", () => {
        return request(app).get("/api/articles/2/comments").expect(200).then(({body}) => {
            expect(body.comments).toEqual([])
        })
    })
    test(":( GET 400 - returns bad request given invalid article id", () => {
        return request(app).get("/api/articles/ab/comments").expect(400).then(({body}) => {
            expect(body.msg).toEqual("bad request!")
        })
    })
    test(":( GET 404 - returns article not found given invalid article id", () => {
        return request(app).get("/api/articles/700/comments").expect(404).then(({body}) => {
            expect(body.msg).toEqual("article not found!")
        })
    })
})