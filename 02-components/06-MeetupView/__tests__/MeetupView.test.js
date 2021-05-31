const { getSolutionPath } = require('taskbook-test-utils');
const { default: MeetupView } = require(getSolutionPath('MeetupView'));
import { shallowMount } from '@vue/test-utils';
import meetup from './__fixtures__/meetup.json';
import { getImageUrlByImageId } from '../data';

describe('components/MeetupView', () => {
  describe('MeetupView', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(MeetupView, { propsData: { meetup } });
    });

    it('MeetupView должен иметь обязательный параметр meetup с объектом митапа', () => {
      expect(wrapper.vm.$options.props.meetup.type).toBe(Object);
      expect(wrapper.vm.$options.props.meetup.required).toBe(true);
    });

    it('MeetupView должен выводить изображение и заголовок митапа с MeetupCover', () => {
      const cover = wrapper.findComponent({ name: 'MeetupCover' });
      expect(cover.exists()).toBeTruthy();
      expect(cover.props('title')).toBe(meetup.title);
      expect(cover.props('link')).toBe(getImageUrlByImageId(meetup.imageId));
    });

    it('MeetupView не должен передавать ссылку на изображение в MeetupCover, если у митапа нет изображения', () => {
      const wrapper = shallowMount(MeetupView, { propsData: { meetup: { ...meetup, imageId: null } } });
      const cover = wrapper.findComponent({ name: 'MeetupCover' });
      expect(cover.exists()).toBeTruthy();
      expect(cover.props('title')).toBe(meetup.title);
      expect(cover.props('link')).toBeFalsy();
    });

    it('MeetupView должен выводить описание митапа с MeetupDescription', () => {
      const description = wrapper.findComponent({ name: 'MeetupDescription' });
      expect(description.exists()).toBeTruthy();
      expect(description.props('description')).toBe(meetup.description);
    });

    it('MeetupView должен выводить краткую информацию митапа с MeetupInfo', () => {
      const info = wrapper.findComponent({ name: 'MeetupInfo' });
      expect(info.exists()).toBeTruthy();
      expect(info.props('organizer')).toBe(meetup.organizer);
      expect(info.props('place')).toBe(meetup.place);
      expect(info.props('date')).toEqual(new Date(meetup.date));
    });

    it('MeetupView должен выводить программу митапа с MeetupAgenda', () => {
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' });
      expect(agenda.exists()).toBeTruthy();
      expect(agenda.props('agenda')).toEqual(meetup.agenda);
    });
  });
});
