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
      <meetup-agenda-item v-for="item in agenda" :agendaItem="item" v-key="item.id"/>
    </div>`,
};

export default MeetupAgenda;
