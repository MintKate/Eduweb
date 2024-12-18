const express = require("express");
const cors = require("cors");
const pool = require("./database");
const { body, validationResult } = require('express-validator');    
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/adduser", [
    body('email').isEmail().withMessage('Email không hợp lệ'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Định dạng email không hợp lệ!' });
        }

        const { username, email, password } = req.body; // Lấy dữ liệu từ body
    
        console.log("Request received:", { username, email, password });
    
        try {
            // Kiểm tra nếu email đã tồn tại
            const emailExists = await pool.query('SELECT * FROM accounts WHERE email = $1', [email]);
            if (emailExists.rows.length > 0) {
              return res.status(400).json({ message: 'Tài khoản đã tồn tại!' });
            }
      
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
            }catch (error) {
                console.error('Lỗi khi lưu dữ liệu:', error);
                res.status(500).json({ message: 'Lỗi hệ thống, vui lòng thử lại!' });
            }
    }  
]);
    
const session = require("express-session");

// Thiết lập session middleware
app.use(
  session({
    secret: "my_edu_web_key_2151163735", // Thay bằng secret key bảo mật
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt `true` nếu dùng HTTPS
  })
);


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const query = `SELECT * FROM accounts WHERE email = $1`;
      const result = await pool.query(query, [email]);
  
      if (result.rows.length === 0) {
        return res.status(400).send({ message: "Email không tồn tại!" });
      }
  
      const user = result.rows[0];
  
      // Kiểm tra mật khẩu (không mã hóa)
      if (user.password !== password) {
        return res.status(400).send({ message: "Mật khẩu không đúng!" });
      }
  
      // Lưu thông tin vào session
      req.session.user = { username: user.username, email: user.email };
      res.status(200).send({ message: "Đăng nhập thành công!", user });
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).send({ message: "Lỗi máy chủ, vui lòng thử lại!" });
    }
  });

  // Endpoint lấy thông tin người dùng từ session
app.get("/session", (req, res) => {
  if (req.session.user) {
    return res.status(200).send(req.session.user);
  } else {
    return res.status(401).send({ message: "Người dùng chưa đăng nhập!" });
  }
});



app.listen(4000, () => console.log("Server running on http://localhost:4000"));
