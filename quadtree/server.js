import express from "express";
import path from "path";
import ejs from "ejs";

const __dirname = path.resolve();

const app = express();

app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.html");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
