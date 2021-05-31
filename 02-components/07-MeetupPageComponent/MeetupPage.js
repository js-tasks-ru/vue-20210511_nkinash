import MeetupView from './../06-MeetupView/MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

const MeetupPage = {
  name: 'MeetupPage',
  components: {
    MeetupView
  },
  data() {
    return {
      meetupID: MEETUP_ID,
      meetup: null
    }
  },
  methods: {
    getMeetupData() {
      fetchMeetup(this.meetupID)
        .then(res => this.meetup = res)
    },
  },
  mounted() {
    this.getMeetupData()
  },

  template: `<div>
    <meetup-view v-if="meetup" :meetup="meetup"/>
  </div>`,
};

export default MeetupPage;
