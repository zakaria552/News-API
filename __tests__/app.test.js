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
            body.articles.forEach((article) => {
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
            expect(Object.keys(body.article).length).toBe(8)
            expect(body.article).toMatchObject({
                "author" : expect.any(String),
                "title": expect.any(String),
                "article_id" : 3,
                "body" : expect.any(String),
                "topic": expect.any(String),
                "created_at": expect.any(String),
                "votes" : expect.any(Number),
                "comment_count": expect.any(String)
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
            const comments = [
                {
                    "comment_id" : 11,
                    "votes" : 0,
                    "created_at" : expect.any(String),
                    "author": "icellusedkars", 
                    "body": "Ambidextrous marsupial"
                },
                {
                "comment_id" : 10,
                "votes" : 0,
                "created_at" : expect.any(String),
                "author": "icellusedkars", 
                "body": "git push origin master"
            }]
            expect(body.comments).toBeSortedBy('comment_id', {descending: true})
            expect(body.comments).toEqual(comments)
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
    test(":) POST 201 - posts comment given article id, returns posted comment", () => {
        const comment = {
            "username": "lurker",
            "body": "added comment",
        }
        return request(app).post("/api/articles/2/comments").send(comment).expect(201).then(({body}) => {
            expect(body.comment).toMatchObject({
                comment_id: 19,
                body: "added comment",
                votes: 0,
                article_id: 2,
                author: "lurker",
                created_at: expect.any(String)
            })
        })
    })
    test(":) POST 201 - posts a comment in article given a body with properties more than needed", () => {
        const comment = {
            "username": "lurker",
            "body": "added comment",
            "author": "jack"
        }
        return request(app).post("/api/articles/2/comments").send(comment).expect(201).then(({body}) => {
            expect(body.comment).toMatchObject({
                comment_id: 19,
                body: "added comment",
                votes: 0,
                article_id: 2,
                author: "lurker",
                created_at: expect.any(String)
            })
        })
    } )
    test(":( POST 404 - returns article not found given article that does not exist", () => {
        return request(app).post("/api/articles/434/comments").expect(404).then(({body}) => {
            expect(body.msg).toBe("article not found!")
        })
    })
    test(":( POST 400 - returns bad request given malformed body or missing field requirement", () => {
        return request(app).post("/api/articles/2/comments").send({msg: "fds", username: "lurker"}).expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
    test(":( POST 400 - returns bad request given body that fails schema validation", () => {
        return request(app).post("/api/articles/2/comments").send({body: 2021, username: 999}).expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
    test(":( POST 400 - returns user bad request given username that violates foreign key constraint", () => {
        const body = {
            "username": "zakaria",
            "body": "added comment",
            "author": "jack"
        }
        return request(app).post("/api/articles/2/comments").send(body).expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
})
describe("PATCH /api/articles/:article_id", () => {
    test(":) PATCH 200 - updates the article given article id, returns key of updated article", () => {
        return request(app).patch("/api/articles/1").send({inc_votes: -5}).expect(200).then(({body}) => {
            expect(body.article).toMatchObject({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 95,
            })
        })
    })
    test(":) PATCH 200 - updates the article given body that has more properties than needed", () => {
        return request(app).patch("/api/articles/1").send({inc_votes: 4, article_id: 5}).expect(200).then((({body}) => {
            expect(body.article).toMatchObject({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: expect.any(String),
                votes: 104,
            })
        }))
    })
    test(":( PATCH 400 - returns bad request given malformed body or missing field requirement", () => {
        return request(app).patch("/api/articles/1").send({author: "fds"}).expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
    test(":( PATCH 400 - returns bad request given wrong data type to inc_votes", () => {
        return request(app).patch("/api/articles/1").send({inc_votes: "adsf"}).expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
    test(":( PATCH 404 - returns article not found given invalid article id", () => {
        return request(app).patch("/api/articles/434").send({inc_votes: 3}).expect(404).then(({body}) => {
            expect(body.msg).toBe("article not found!")
        })
    })
})
describe("/api/articles(queries)", () => {
    test("GET 200 - filters the articles by specified topic", () => {
        return request(app).get("/api/articles?topic=mitch").expect(200).then(({body}) => {
            expect(body.articles).toHaveLength(11)
            body.articles.forEach((article) => {
                expect(article.topic).toBe("mitch")
            })
        })
    })
    test("GET 200 - given no topic query returns all the articles", () => {
        return request(app).get("/api/articles").expect(200).then(({body}) => {
            expect(body.articles).toHaveLength(12)
            body.articles.forEach((article) => {
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
    test("GET 200 - sorts by given column name", () => {
        return request(app).get("/api/articles?sort_by=article_id").expect(200).then(({body}) => {
            expect(body.articles).toBeSortedBy("article_id", {descending: true})
        })
    })
    test("GET 200 - sorts by date in descending order if not given sort by query", () => {
        return request(app).get("/api/articles").expect(200).then(({body}) => {
            expect(body.articles).toBeSortedBy("created_at", {descending: true})
        })
    })
    test("GET 400 - given invalid sort query returns invalid sort query", () => {
        return request(app).get("/api/articles?sort_by=password").expect(400).then(({body}) => {
            expect(body.msg).toBe("invalid sort query!")
        })
    })
    test("GET 400 - given invalid order query returns invalid order query", () => {
        return request(app).get("/api/articles?sort_by=created_at&order=square").expect(400).then(({body}) => {
            expect(body.msg).toBe("invalid order query!")
        })
    })
    test("GET 200 - given valid order query, orders the sort column", () => {
        return request(app).get("/api/articles?sort_by=article_id&order=asc").expect(200).then(({body}) => {
            expect(body.articles).toBeSortedBy("article_id")
        })
    })
    test("GET 400 - given misspelled key query returns bad request", () => {
        return request(app).get("/api/articles?yb_tros=article_id&ordr=asc").expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
    test("GET 400 - given topic query with invalid topic value returns invalid topic query", () => {
        return request(app).get("/api/articles?topic=wtf").expect(400).then(({body}) => {
            expect(body.msg).toEqual("invalid topic query!")
        })
    })
    test("GET 200 - given a valid topic query but has no articles returns an empty array of articles", () => {
        return request(app).get("/api/articles?topic=paper").expect(200).then(({body}) => {
            expect(body.articles).toHaveLength(0)
        })
    })
})
describe("GET /api/articles/:article_id", () => {
    test(":) 200 - response object now contains the count of all its comments", () => {
        return request(app).get("/api/articles/1").expect(200).then(({body}) => {
            expect(body.article.comment_count).toBe("11")
        })
    })
})
describe("DELETE /api/comments/:comment_id", () => {
    test(":) 204 - deletes comment by id", () => {
        return request(app).delete("/api/comments/2").expect(204)
    })
    test(":( 404 - returns comment not found given comment id that does not exist", () => {
        return request(app).delete("/api/comments/2323").expect(404).then(({body}) => {
            expect(body.msg).toBe("comment not found!")
        })
    })
    test(":( 400 - returns bad request given invalid comment id", () => {
        return request(app).delete("/api/comments/nonsense").expect(400).then(({body}) => {
            expect(body.msg).toBe("bad request!")
        })
    })
})