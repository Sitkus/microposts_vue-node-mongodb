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
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      };
      const response = await fetch(url, config);

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async deletePost(id) {
    try {
      const config = { method: 'DELETE' };
      const response = await fetch(`${url}${id}`, config);
      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export default PostService;
