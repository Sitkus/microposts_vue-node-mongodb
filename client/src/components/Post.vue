<template>
  <div>
    <h1>Hello world!</h1>
    <div>
      <div v-for="(post, index) in posts" :key="post._id" :item="post" :index="index">
        <p>{{ post.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../logic/PostService';
import { ref } from 'vue';

export default {
  name: 'Post',
  setup() {
    const posts = ref([]);
    const error = ref('');
    const description = ref('');

    async function fetchPosts() {
      try {
        posts.value = await PostService.getPosts();
      } catch (err) {
        error.value = err.message;
      }
    }

    fetchPosts();

    return {
      posts,
      error,
      description
    };
  }
};
</script>

<style scoped lang="scss">
//
</style>
