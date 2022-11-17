const {isValidQuery} = require("../utils/utils2")

describe("isValidQuery", () => {
    test("given an empty query object return valid query", () => {
        expect(isValidQuery({}, ["age", "name"])).toBe(true)
    })
    test("given a valid query object returns true", () => {
        const query = {age: 10, name: "zakaria"}
        const validQueries = ["age", "name"]
        expect(isValidQuery(query, validQueries)).toBe(true)
    })
    test("given a query object with atleast one invalid returns false", () => {
        const query = {age: 10, name: "zakaria"}
        const validQueries = ["birth", "name"]
        expect(isValidQuery(query, validQueries)).toBe(false)
    })
})