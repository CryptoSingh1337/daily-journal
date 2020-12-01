const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
const _ = require("lodash");
const post = require(__dirname + "/Post.js");
const port = 8080;

const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", (req, res) => {
  res.render("home", { _homeContent: homeStartingContent, _posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { _aboutContent: aboutContent })
});

app.get("/contact", (req, res) => {
  res.render("contact", { _contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const title = req.body.postTitle;
  const body = req.body.postBody;
  posts.push(post.getPost(title, body));
  res.redirect("/");
});

app.get("/posts/:post_name", (req, res) => {
  const _postTitle = req.params.post_name;
  const currPost = post.findPost(_.lowerCase(_postTitle), ...posts);
  if (currPost !== null) {
    res.render("post", { postTitle: currPost.postTitle, postBody: currPost.postBody });
  } else {
    res.render("error404");
  }
});

app.get("*", (req, res) => {
  res.render("error404");
})

app.listen(process.env.PORT || port, () => {
  console.log("Server is running on port: " + port);
});
