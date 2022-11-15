const db = require("../db/connection")

exports.selectUsers = () => {
    console.log("???")
    return db.query("SELECT * FROM users;").then((results) => {
        return results.rows
    })
}