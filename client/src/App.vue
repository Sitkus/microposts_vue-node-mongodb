<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <AddPost @updatePosts="posts = $event" v-bind:posts="posts" />
  <Post @updatePosts="posts = $event" v-if="!isLoading" v-bind:posts="posts" />
</template>

<script>
import { ref } from 'vue';
import PostService from './logic/PostService';
import { Post, AddPost } from './components';

export default {
  name: 'App',
  components: {
    Post,
    AddPost
  },
  setup() {
    const posts = ref([]);
    const error = ref('');
    const isLoading = ref(true);

    async function fetchPosts() {
      try {
        posts.value = await PostService.getPosts();
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    }

    fetchPosts();

    return {
      posts,
      error,
      isLoading
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
