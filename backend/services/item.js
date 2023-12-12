const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData(nombre, marca, tipo, precio) {
    const result = await db.query(
        'INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)',
        [nombre, marca, tipo, precio]
    )
    return result.affectedRows
}
async function insertDataEXAMEN(articulo, persona, fecha) {
    const result = await db.query(
        'INSERT INTO prestamos (articulo, persona, fecha) VALUES (?, ?, ?)',
        [articulo, persona, fecha]
    )
    return result.affectedRows
}

async function getData(req, res) {
    const rows = await db.query(
        'SELECT * FROM coleccion'
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}
async function getDataEXAMEN(req, res) {
    const rows = await db.query(
        'SELECT * FROM prestamos'
    )
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}
async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(
        'DELETE FROM coleccion WHERE id = ?',
        [data.id]
    )
    return result.affectedRows
}
module.exports = {
    getData,
    getDataEXAMEN,
    insertData,
    insertDataEXAMEN,
    deleteData
}