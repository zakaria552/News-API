const db = require("../db/connection")

exports.selectUsers = () => {
    return db.query("SELECT * FROM users;").then((results) => {
        return results.rows
    })
}