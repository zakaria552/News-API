const db = require("../db/connection")
const fs = require("fs/promises")
exports.sendEndPoints = () => {
    return fs.readFile("endpoints2.json", "utf8").then((file) => {
        return file
    })
}