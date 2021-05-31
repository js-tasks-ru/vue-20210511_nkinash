const { getSolutionPath } = require('taskbook-test-utils');
const { default: MeetupPage } = require(getSolutionPath('MeetupPage'));
const data = require(getSolutionPath('data'));
import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import meetup from './__fixtures__/meetup';

jest.mock('../data');

describe('components/MeetupPageComponent', () => {
  describe('MeetupPage', () => {
    it('MeetupPage не должен выводить MeetupView, пока нет данных митапа', async () => {
      jest.spyOn(data, 'fetchMeetup').mockResolvedValue(meetup);
      const wrapper = shallowMount(MeetupPage);
      expect(wrapper.findComponent({ name: 'MeetupView' }).exists()).toBeFalsy();
      await flushPromises();
    });

    it('MeetupPage должен выводить данные митапа полученные из функции fetchMeetup с помощью компонента MeetupView', async () => {
      jest.spyOn(data, 'fetchMeetup').mockResolvedValue(meetup);
      const wrapper = shallowMount(MeetupPage);
      await flushPromises();
      const view = wrapper.findComponent({ name: 'MeetupView' });
      expect(data.fetchMeetup).toHaveBeenCalled();
      expect(view.exists()).toBe(true);
      expect(view.props('meetup')).toEqual(meetup);
    });
  });
});
