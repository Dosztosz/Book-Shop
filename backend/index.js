import express from "express";
import mysql from "mysql";
import cors from "cors";

//Getting express
const app = express();

//Login data should be in another file
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

//Allowing JSON
app.use(express.json());
//Allowing DATA from Client
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

//Query for displaying Books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Query for Inserting new book
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created succesfully");
  });
});

//Query for deleting new book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted succesfully");
  });
});

//Query for updating new book
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//Checking if the connection is good
app.listen(8800, () => {
  console.log("Connected to backend!");
});
