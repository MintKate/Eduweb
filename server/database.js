const { response } = require("express")
const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "Kt0106",
    host: "localhost",
    port: 5432,
    database: "eduweb",
});

// const createTblQry = `CREATE TABLE accounts (
//     user_id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(50) UNIQUE NOT NULL,
//     password VARCHAR(50) UNIQUE NOT NULL
//     );`
    

// pool.query(createTblQry)
//     .then((response) => {
//         console.log("Table Created")
//         console.log(response)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

module.exports = pool
