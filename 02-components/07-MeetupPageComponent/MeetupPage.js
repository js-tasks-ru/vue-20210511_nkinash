import MeetupView from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

const MeetupPage = {
  name: 'MeetupPage',

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: null,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      this.meetup = await fetchMeetup(MEETUP_ID);
    },
  },

  template: `
    <div>
      <meetup-view v-if="meetup" :meetup="meetup" />
    </div>`,
};

export default MeetupPage;
