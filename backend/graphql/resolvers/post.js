import Post from "../../models/Post.model.js";

export default {
  async getPosts() {
    return await Post.query();
  },
  async getPost(_, { id }) {
    return await Post.query().findById(id);
  },
  async createPost(_, args) {
    return await Post.query().insert(args);
  },
  async updatePost(_, { id, title, content }) {
    return await Post.query().patchAndFetchById(id, { title, content });
  },
  async deletePost(_, { id }) {
    return await Post.query().deleteById(id);
  }
};
