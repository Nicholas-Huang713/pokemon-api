const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creatorId: String,
    creatorName: String,
    title: String,
    description: String,
    likes: [String],
    date: {
        type: String,
        default: Date.now()
    }
})   

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;