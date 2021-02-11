import { shallowMount } from '@vue/test-utils';
import { Posts } from '@/components';

let wrapper = null;

beforeEach(() => {
  wrapper = shallowMount(Posts, {
    props: {
      posts: [
        {
          _id: '6023e7688cc3a81a527692ce',
          description: 'Hello world!',
          createdAt: new Date()
        }
      ]
    }
  });
});

afterEach(() => {
  wrapper.unmount();
});

describe('Posts.vue', () => {
  test('posts are being rendered', () => {
    const postDescription = wrapper.find('[data-testid="post-description"]');
    const postDate = wrapper.find('[data-testid="post-date"]');

    const date = new Date();
    const todaysFormattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    expect(postDescription.text()).toBe('Hello world!');
    expect(postDate.text()).toBe(todaysFormattedDate);
  });

  // test('"deletePost" function called upon click of delete button', async () => {
  //   const deleteButton = wrapper.find('[data-testid="delete-button"]');

  //   await deleteButton.trigger('click');

  //   console.log(wrapper.html());

  //   expect(wrapper.emitted('deletePost')).toHaveLength(1);
  // });
});
