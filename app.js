const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const dbHandling = require("./DB/dbHandling");
const port = 8080;
const url = "mongodb+srv://***REMOVED***:***REMOVED***-password@cluster0.msjrw.mongodb.net/blogPostDB";

const app = express();

dbHandling.connect(url);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", async (req, res) => {
  const posts = await dbHandling.getPosts();
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
  const title = _.capitalize(_.lowerCase(req.body.postTitle));
  const body = req.body.postBody;
  dbHandling.savePost(title, body);
  res.redirect("/");
});

app.get("/delete/:post_name", (req, res) => {
  const _postTitle = _.lowerCase(req.params.post_name);
  const deletedPost = dbHandling.deletePost(_.capitalize(_postTitle));
  if (deletedPost === null) {
    console.log("No Post is deleted");
  } else {
    console.log("Post Deleted");
  }
  res.redirect("/");
});

app.get("/posts/:post_title", async (req, res) => {
  const _postTitle = _.capitalize(_.lowerCase(req.params.post_title));
  const currPost = await dbHandling.findPost(_postTitle);
  if (currPost !== null) {
    res.render("post", { postTitle: currPost.title, postBody: currPost.body });
  } else {
    res.render("error404", { error: "404 - The Post can't be found" });
  }
});

app.get("*", (req, res) => {
  res.render("error404", { error: "404 - The Page can't be found" });
})

app.listen(process.env.PORT || port, () => {
  console.log("Server is running on port: " + port);
});
