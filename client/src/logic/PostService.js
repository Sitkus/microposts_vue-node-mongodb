const url = 'http://localhost:5000/api/posts/';

class PostService {
  static getPosts() {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(
            data.map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt)
            }))
          );
        })
        .catch((err) => reject(err));
    });
  }

  static async createPost(description) {
    try {
      const config = { method: 'POST', body: { description } };
      const response = await fetch(url, config);

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  static async deletePost(id) {
    try {
      const config = { method: 'DELETE' };
      const response = await fetch(`${url}${id}`, config);

      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default PostService;
