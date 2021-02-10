<template>
  <main class="main">
    <img class="vue-logo" alt="Vue logo" src="./assets/logo.png" />

    <AddPost @updatePosts="posts = $event" v-bind:posts="posts" />
    <Post @updatePosts="posts = $event" v-if="!isLoading" v-bind:posts="posts" />

    <p class="loading" v-else>Loading...</p>
  </main>
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
:root {
  --black: #161616;
  --light-gray: #f1f1f1;
  --light-white: #f9f9f9;
  --yellow: #eda31d;
  --green: #42b883;
  --blue: #2c3e50;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 10px;
  background-color: white;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  overflow-y: scroll;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  color: var(--black);
  font-size: 1.6rem;
  overflow-x: hidden;
  overflow-y: auto;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  background-color: var(--blue);
  color: var(--green);
  font-size: 1.4rem;
  font-weight: 500;
  border: none;
  outline: none;
  border-radius: 0.6rem;
  box-shadow: 0.2rem 0.2rem 0 0 #2c3e5065;
  padding: 1rem;
  cursor: pointer;
  transition: 200ms all ease-in-out;

  &:active {
    box-shadow: 0 0 0 0;
    transition: 200ms all ease-in-out;
  }
}

#app {
  text-align: center;
  color: var(--blue);
  margin-top: 60px;
}

.vue-logo {
  margin-bottom: 20px;
}

.loading {
  color: green;
  font-size: 16px;
}
</style>
