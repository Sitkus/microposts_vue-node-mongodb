<template>
  <div>
    <div v-for="(post, index) in posts" :key="post._id" :item="post" :index="index">
      <p>{{ post.description }}</p>
      <button @click="deletePost(post._id)">Delete me</button>
    </div>
  </div>
</template>

<script>
import PostService from '../logic/PostService';
import { ref } from 'vue';

export default {
  name: 'Post',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const error = ref('');
    const isLoading = ref(true);

    async function deletePost(id) {
      await PostService.deletePost(id);
      const newPosts = await PostService.getPosts();

      emit('updatePosts', newPosts);
    }

    return {
      error,
      isLoading,
      deletePost
    };
  }
};
</script>

<style scoped lang="scss">
//
</style>
