const { getSolutionPath } = require('taskbook-test-utils');
const { default: MeetupCover } = require(getSolutionPath('MeetupCover'));
import { shallowMount } from '@vue/test-utils';
import meetup from './__fixtures__/meetup.json';

const API_URL = 'https://course-vue.javascript.ru/api';

function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

describe('components/MeetupCover', () => {
  describe('MeetupCover', () => {
    it('MeetupCover должен иметь необязательные параметры link и title', () => {
      const wrapper = shallowMount(MeetupCover);
      expect(wrapper.vm.$options.props.link.type).toBe(String);
      expect(wrapper.vm.$options.props.link.required).toBeFalsy();
      expect(wrapper.vm.$options.props.title.type).toBe(String);
      expect(wrapper.vm.$options.props.title.required).toBeFalsy();
    });

    it('MeetupCover должен выводить изображение митапа', () => {
      const link = getImageUrlByImageId(meetup.imageId);
      const wrapper = shallowMount(MeetupCover, { propsData: { link } });
      expect(wrapper.find('.meetup-cover').attributes().style).toContain(link);
    });

    it('MeetupCover не должен удалять изображение по умолчанию при отсутствии ссылки на изображение', () => {
      const wrapper = shallowMount(MeetupCover);
      expect(wrapper.find('.meetup-cover').attributes('style') ?? '').not.toContain('--bg-url');
    });

    it('MeetupCover должен выводить название митапа', () => {
      const { title } = meetup;
      const wrapper = shallowMount(MeetupCover, {
        propsData: { title },
      });

      expect(wrapper.find('.meetup-cover__title').text()).toContain(title);
    });
  });
});
