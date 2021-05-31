import MeetupAgendaItem from './MeetupAgendaItem.js';

const MeetupAgenda = {
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem
  },
  props: {
    agenda: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="meetup-agenda">
      <h3>Программа</h3>
      <meetup-agenda-item v-for="item in agenda" :agendaItem="item" :key="item.id"/>
    </div>`,
};

export default MeetupAgenda;
