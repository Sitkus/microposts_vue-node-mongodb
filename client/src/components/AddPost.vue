<template>
  <form @submit.prevent="createPost" method="POST">
    <input type="text" v-model="description" />
    <button type="submit">Add post</button>
  </form>
</template>

<script>
import PostService from '../logic/PostService';
import { ref } from 'vue';

export default {
  name: 'AddPost',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const error = ref('');
    const description = ref('');

    async function createPost() {
      await PostService.createPost(description.value);
      const newPosts = await PostService.getPosts();

      emit('updatePosts', newPosts);

      description.value = '';
    }

    return {
      error,
      description,
      createPost
    };
  }
};
</script>

<style scoped lang="scss">
//
</style>
