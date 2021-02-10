<template>
  <form @submit.prevent="createPost" method="POST">
    <input type="text" v-model="description" />
    <p>AddPost</p>
  </form>
</template>

<script>
import PostService from '../logic/PostService';
import { ref, computed } from 'vue';

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

    const posts = computed({
      get: () => props.posts,
      set: (newPosts) => emit('updatePosts', newPosts)
    });

    async function createPost() {
      await PostService.createPost(description.value);

      posts.value = await PostService.getPosts();

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
