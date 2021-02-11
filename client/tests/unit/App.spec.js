import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import { Posts } from '@/components';

let wrapper = null;

beforeEach(() => {
  wrapper = shallowMount(App);
});

afterEach(() => {
  wrapper.unmount();
});

describe('App.vue', () => {
  test("loading message doesn't exist if posts is rendered", () => {
    const posts = wrapper.findComponent(Posts);
    const loading = wrapper.find('[data-testid="loading"]');

    expect(posts.exists()).toBe(true);
    expect(loading.exists()).toBe(false);
  });

  test('error message is rendered if error occured while trying to fetch posts', () => {
    const error = wrapper.find('[data-testid="error-message"]');

    expect(error.text()).toBe('fetch is not defined');
  });
});
