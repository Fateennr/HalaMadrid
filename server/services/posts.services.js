const { Types } = require('mongoose');
const PostModel = require('../models/posts.model.js');

class PostService {

  async createPost({ authorId, avatar, content, image }) {
    const post = new PostModel({
      author: new Types.ObjectId(authorId),
      avatar,
      content,
      image,
    })
    return post.save()
  }

  async getPostsByUser(userId) {
    return PostModel.find({ author: userId })
      .sort({ createdAt: -1 })
      .exec()
  }

  async getFeedPosts() {
    return PostModel.find()
    .sort({ createdAt: -1 })
    .populate({ 
      path: 'author', 
      select: 'username'        
    })
    .exec()
  }


  async likePost(postId) {
    return PostModel.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    ).exec()
  }

  async updatePost(postId, updates) {
    const allowed = {}
    if (updates.content !== undefined) allowed.content = updates.content
    if (updates.image   !== undefined) allowed.image   = updates.image

    return PostModel.findByIdAndUpdate(
      postId,
      { $set: allowed },
      { new: true }
    ).exec()
  }

  async deletePost(postId) {
    return PostModel.findByIdAndDelete(postId).exec()
  }
}

module.exports = new PostService();
