<template>
  <ul class="posts">
    <li class="post" v-for="post in posts" :key="post._id">
      <div class="post__content">
        <p data-testid="post-description" class="post__description">{{ post.description }}</p>
        <p data-testid="post-date" class="post__date">{{ formatCreatedAtDate(post.createdAt) }}</p>
      </div>
      <button data-testid="delete-button" class="post__button" @click="deletePost(post._id)">Delete</button>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import PostService from '../logic/PostService';

export default {
  name: 'Posts',
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

    function formatCreatedAtDate(date) {
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    return {
      error,
      deletePost,
      formatCreatedAtDate
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

  &__date {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
}
</style>
