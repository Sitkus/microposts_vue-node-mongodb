<template>
  <ul class="posts">
    <li class="post" v-for="(post, index) in posts" :key="post._id" :item="post" :index="index">
      <p class="post__description">{{ post.description }}</p>
      <button class="post__button" @click="deletePost(post._id)">Delete</button>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import PostService from '../logic/PostService';

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

    async function deletePost(id) {
      await PostService.deletePost(id);
      const newPosts = await PostService.getPosts();

      emit('updatePosts', newPosts);
    }

    return {
      error,
      deletePost
    };
  }
};
</script>

<style scoped lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  width: 40rem;
  margin: 0 auto;
  list-style-type: none;
}

.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--green);
  text-align: left;
  font-weight: 500;
  padding: 2rem 3rem;
  margin-top: 2rem;
  border-radius: 0.6rem;
  white-space: pre-line;

  &:first-child {
    margin-top: 0;
  }
}
</style>
