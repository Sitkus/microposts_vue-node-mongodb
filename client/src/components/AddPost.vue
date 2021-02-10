<template>
  <form class="form" @submit.prevent="checkIfInputIsNotEmpty" method="POST">
    <label class="form__label" for="description">Your post:</label>
    <textarea
      class="form__input"
      :class="{ 'form__input--error': error }"
      name="description"
      id="description"
      type="text"
      v-model.trim="description"
      placeholder="What's on your mind today?"
    ></textarea>
    <button class="form__button" type="submit">Add post</button>
    <div class="error">
      <p v-if="error" class="error__message">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import PostService from '../logic/PostService';

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

    function checkIfInputIsNotEmpty() {
      if (description.value.length > 0) {
        createPost();
        clearErrorAndDescriptionFields();
      } else {
        error.value = 'Please fill in the input field';
      }
    }

    async function createPost() {
      await PostService.createPost(description.value);
      const newPosts = await PostService.getPosts();

      emit('updatePosts', newPosts);
    }

    function clearErrorAndDescriptionFields() {
      error.value = '';
      description.value = '';
    }

    return {
      error,
      description,
      checkIfInputIsNotEmpty
    };
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 2rem auto;

  &__label {
    margin-bottom: 0.5rem;
    text-align: left;
  }

  &__input {
    font-family: Avenir, sans-serif;
    font-size: 1.6rem;
    border: none;
    outline: none;
    resize: vertical;
    background-color: var(--light-gray);
    height: 10rem;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;

    &:focus {
      box-shadow: inset 0 0 0 0.2rem var(--green);
    }
  }

  &__input--error {
    box-shadow: inset 0 0 0 0.2rem rgb(187, 6, 6);
  }

  &__button {
    background-color: var(--green);
    color: var(--blue);
    border-radius: 0;

    &:hover {
      background-color: var(--blue);
      color: var(--green);
    }
  }
}

.error {
  height: 2rem;
  margin-top: 2rem;

  &__message {
    font-weight: 500;
    color: rgb(187, 6, 6);
  }
}
</style>
