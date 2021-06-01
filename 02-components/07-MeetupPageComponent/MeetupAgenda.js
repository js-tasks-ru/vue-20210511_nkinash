import MeetupAgendaItem from './MeetupAgendaItem.js';

const MeetupAgenda = {
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item
        v-for="agendaItem in agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
        class="meetup-agenda__item"
      />
    </div>`,
};

export default MeetupAgenda;
