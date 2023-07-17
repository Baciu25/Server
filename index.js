import express from "express";
import db from "./db.js";

const app = express();
const homepage = `
<html>
    <H1>hello world</H1>
    <a href="/">Go To home</a>
    <a href="/projects">projects (doesnt exist yet)</a> 
    <a href="/contact">contact (doesnt exist yet)</a> 
    <a href="/resume">resume (doesnt exist yet)</a> 
    <a href="/about">about</a>
    <div id="list"></div>
    <script>
      fetch("/search?name=pasta")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const list = document.getElementById("list");
          data.forEach((restaurant) => {
            const div = document.createElement("div");
            div.innerHTML = restaurant.name  + " (" + restaurant.ethnicity + ") "
            list.appendChild(div);
          });
        });
    </script>
</html>
`;
app.get("/", (req, res) => res.send(homepage));
app.get("/about", (req, res) => res.send("about:i am a fullstack developer"));
app.get("/json", (req, res) => res.send({ username: "bob", age: 32 }));
// app.get("/search", (req, res) => res.send(req.query));
// route 4 takes a search and return info about that search
// https://www.google.com/search?q=cats
// QUERY STRING containing QUERY PARAMETERS

app.get("/search", (req, res) => {
  console.log("the received query parameters are ", req.query);
  const matchingRestaurants = db.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.name.toLowerCase());
  });
  res.send(
    matchingRestaurants.length > 0
      ? matchingRestaurants
      : "sorry there are no restaurants matching your criteria"
  );
});
// /about
// /settings
// /json

app.listen(9000, () => console.log("Server is running on port 9000"));
