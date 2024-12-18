const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
    const { username, email, password } = req.body; // Lấy dữ liệu từ body

    console.log(`Username: ${username}; Email: ${email}; Password: ${password}`);

    // Truy vấn tham số hóa
    const insertSTMT = `INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)`;

    // Thực thi truy vấn
    pool
        .query(insertSTMT, [username, email, password]) // Truyền các tham số vào
        .then((response) => {
            console.log("Data saved successfully.");
            console.log(response);
            res.status(201).send("User added successfully!");
        })
        .catch((err) => {
            console.error("Error saving data:", err);
            res.status(500).send("Error adding user.");
        });
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
