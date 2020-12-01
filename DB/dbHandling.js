const mongoose = require("mongoose");

exports.connect = function(url) {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log("Connected to Database"));
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);

exports.savePost = function (title, body) {
    new Post({
        title: title,
        body: body,
    }).save()
    .then(() => {console.log("Post Saved Successfully!")})
    .catch(err => {
        console.log(err.message);
        throw err;
    });
}

exports.findPost = function(_title) {
    return Post.findOne({title: _title}, (err, found) => {
        if(err) {
            console.log("Error Occurred in finding the post!" + "\n" + err.message);
            throw err;
        } else {
            return found;
        }
    })
}

exports.deletePost = function(title) {
    Post.findOneAndDelete({title: title}, (err, res) => {
        if(err) {
            console.log("Post not Deleted" + err.message);
            throw err;
        } else {
            return res;
        }
    })
}

exports.getPosts = function() {
    return Post.find({}, (err, posts) => {
        if(err) {
            console.log(err.message);
            throw err;
        } else {
            return posts;
        }
    });
}