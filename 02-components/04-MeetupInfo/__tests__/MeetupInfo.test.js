const { getSolutionPath } = require('taskbook-test-utils');
const { default: MeetupInfoTest } = require(getSolutionPath('MeetupInfo'));
import { shallowMount } from '@vue/test-utils';
import meetup from './__fixtures__/meetup.json';

describe('components/MeetupInfo', () => {
  describe('MeetupInfo', () => {
    it('MeetupInfo должен иметь обязательные строковые параметры organizer, place и обязательный параметр с датой date', () => {
      expect(MeetupInfoTest.props.organizer).toBeDefined();
      expect(MeetupInfoTest.props.organizer.type).toBe(String);
      expect(MeetupInfoTest.props.organizer.required).toBeTruthy();
      expect(MeetupInfoTest.props.place).toBeDefined();
      expect(MeetupInfoTest.props.place.type).toBe(String);
      expect(MeetupInfoTest.props.place.required).toBeTruthy();
      expect(MeetupInfoTest.props.date).toBeDefined();
      expect(MeetupInfoTest.props.date.type).toBe(Date);
      expect(MeetupInfoTest.props.date.required).toBeTruthy();
    });

    it('MeetupInfo должен выводить краткое описание митапа', () => {
      const wrapper = shallowMount(MeetupInfoTest, {
        propsData: {
          organizer: meetup.organizer,
          place: meetup.place,
          date: new Date(meetup.date),
        },
      });

      expect(wrapper.find('.info-list li:nth-child(1)').text()).toContain(meetup.organizer);
      expect(wrapper.find('.info-list li:nth-child(2)').text()).toContain(meetup.place);
      expect(wrapper.find('.info-list li:nth-child(3)').text()).toContain(
        new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
      expect(wrapper.find('.info-list li:nth-child(3) time').attributes('datetime')).toContain(
        new Date(meetup.date).toISOString().substr(0, 10),
      );
    });
  });
});
