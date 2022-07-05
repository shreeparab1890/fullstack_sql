const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server is running on Port: 5000");
});

/* app.get("/api/get", (res, req) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (err, result) => {
    console.log("error", err);
    console.log("result", result);
  });
}); */

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (err, result) => {
    console.log("error", err);
    console.log("result", result);
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, contact], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id=?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM contact_db where id=?";
  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE contact_db SET name=?, email=?, contact=? where id=?";
  db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  //const sqlInsert =
  "INSERT INTO contact_db (name, email, contact) VALUES ('Shree1', 'shree1@gmail.com', '9923826906')";
  res.send("Hello Express");
  //db.query(sqlInsert, (err, result) => {
  //  console.log("error", err);
  // console.log("result", result);
  //});
});
