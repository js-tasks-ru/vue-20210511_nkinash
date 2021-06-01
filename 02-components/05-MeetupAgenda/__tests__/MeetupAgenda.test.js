const { getSolutionPath } = require('taskbook-test-utils');
const { default: MeetupAgenda } = require(getSolutionPath('MeetupAgenda'));
const { default: MeetupAgendaItem } = require(getSolutionPath('MeetupAgendaItem'));
import { shallowMount } from '@vue/test-utils';
import meetup from './__fixtures__/meetup.json';

describe('components/MeetupAgenda', () => {
  describe('MeetupAgenda', () => {
    it('MeetupAgenda должен иметь параметр массив agenda', () => {
      expect(MeetupAgenda.props.agenda).toBeDefined();
      expect(MeetupAgenda.props.agenda.type).toBe(Array);
    });

    it('MeetupAgenda должен выводить программу через компоненты MeetupAgendaItem с параметром agendaItem', () => {
      const wrapper = shallowMount(MeetupAgenda, {
        propsData: { agenda: meetup.agenda },
      });
      const agendaItemsWrappers = wrapper.findAllComponents(MeetupAgendaItem).wrappers;
      expect(agendaItemsWrappers).toHaveLength(meetup.agenda.length);
      expect(agendaItemsWrappers.map((itemWrapper) => itemWrapper.props('agendaItem'))).toEqual(meetup.agenda);
    });
  });

  describe('MeetupAgendaItem', () => {
    it('MeetupAgendaItem должен иметь обязательный параметр объект agendaItem', () => {
      expect(MeetupAgendaItem.props.agendaItem).toBeDefined();
      expect(MeetupAgendaItem.props.agendaItem.type).toBe(Object);
      expect(MeetupAgendaItem.props.agendaItem.required).toBeTruthy();
    });

    it('MeetupAgendaItem должен выводить время', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, { propsData: { agendaItem } });
      expect(wrapper.find('.meetup-agenda__item-col:nth-child(2)').text()).toContain(
        `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
      );
    });

    it('MeetupAgendaItem должен выводить заголовок по умолчанию', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, { propsData: { agendaItem } });
      expect(wrapper.find('.meetup-agenda__title').text()).toContain('Регистрация');
    });

    it('MeetupAgendaItem должен выводить правильную иконку для регистрации', () => {
      const agendaItem = meetup.agenda[0];
      const wrapper = shallowMount(MeetupAgendaItem, { propsData: { agendaItem } });
      expect(wrapper.find('.meetup-agenda__item-col img').attributes('src')).toContain('key');
    });

    it('MeetupAgendaItem должен выводить доклад', () => {
      const agendaItem = meetup.agenda[2];
      const wrapper = shallowMount(MeetupAgendaItem, {
        propsData: { agendaItem },
      });
      expect(wrapper.find('.meetup-agenda__item-col img').attributes('src')).toContain('tv');
      expect(wrapper.find('.meetup-agenda__title').text()).toContain(agendaItem.title);
      expect(wrapper.find('.meetup-agenda__item .meetup-agenda__item-col:nth-child(2)').text()).toContain(
        `${agendaItem.startsAt} - ${agendaItem.endsAt}`,
      );
      expect(wrapper.find('.meetup-agenda__lang').text()).toContain(agendaItem.language);
      expect(wrapper.find('.meetup-agenda__item').text()).toContain(agendaItem.speaker);
      expect(wrapper.find('.meetup-agenda__item').text()).toContain(agendaItem.description);
    });
  });
});
