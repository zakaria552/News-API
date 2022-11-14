const request = require("supertest")
const db = require("../db/connection")
const {app} = require("../app")
const seed = require("../db/seeds/seed")
const { topicData, userData, articleData, commentData } = require("../db/data/test-data")

beforeEach(() => seed({topicData, userData, articleData, commentData}))
afterAll(() => db.end())

describe("/api/topics", () => {
    test(":) GET 200 - returns an array of topics with properties slug and describtion", () => {
        return request(app).get("/api/topics").expect(200).then(({body}) => {
            body.forEach((topic) => {
                expect(topic).toEqual({
                    "slug": expect.any(String),
                    "description": expect.any(String)
                })
            })
        })
    })
    test(":( GET 404 - returns route not found for invalid end-points", () => {
        return request(app).get("/api/fdssdf").expect(404).then(({body}) => {
            expect(body.msg).toEqual("route not found!")
        })
    })
})