const _ = require("lodash");

exports.getPost = function (postTitle, postBody) {
    return { postTitle: postTitle, postBody: postBody };
}

exports.findPost = function(_postTitle, ...posts) {
    for (let i = 0; i < posts.length; i++) {
        if(_.lowerCase(posts[i].postTitle) === _postTitle)
            return posts[i];
    }
    return null;
}