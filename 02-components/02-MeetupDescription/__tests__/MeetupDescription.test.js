import { shallowMount } from '@vue/test-utils';

const { getSolutionPath } = require('taskbook-test-utils');
const { default: MeetupDescription } = require(getSolutionPath('MeetupDescription'));
import meetup from './__fixtures__/meetup';

describe('components/MeetupDescription', () => {
  describe('MeetupDescription', () => {
    it('MeetupDescription должен иметь строковый параметр description', () => {
      const wrapper = shallowMount(MeetupDescription);
      expect(wrapper.vm.$options.props.description).toBeTruthy();
      expect(wrapper.vm.$options.props.description.type).toBe(String);
    });

    it('MeetupDescription должен выводить описание митапа', () => {
      const wrapper = shallowMount(MeetupDescription, {
        propsData: { description: meetup.description },
      });
      expect(wrapper.text()).toContain(meetup.description);
    });
  });
});
