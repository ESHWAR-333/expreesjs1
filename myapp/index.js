const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();

let db = null;
const initalizeDBAndServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, "goodreads.db"),
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DBError ${e.message}`);
    process.exit(1);
  }
};

initalizeDBAndServer();

app.get("/book/", async (request, response) => {
  const getBooksQuery = `select * from book order by book_id; `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
