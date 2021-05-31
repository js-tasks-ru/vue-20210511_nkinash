import MeetupCover from './../03-MeetupCover/MeetupCover.js';
import MeetupDescription from './../02-MeetupDescription/MeetupDescription.js';
import MeetupAgenda from './../05-MeetupAgenda/MeetupAgenda.js';
import MeetupInfo from './../04-MeetupInfo/MeetupInfo.js';
import { getImageUrlByImageId } from './data.js';
// import axios from 'axios';

const MeetupView = {
  name: 'MeetupView',
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  components: {
    MeetupAgenda, MeetupDescription, MeetupCover, MeetupInfo
  },
  methods: {
    getImageUrl(id) {
      return id ? getImageUrlByImageId(id) : null
    },
    getDate(date) {
      return new Date(date)
    }
  },
  template: `
    <div>
      <!-- meetup cover -->
      <meetup-cover :title="meetup.title" :link="getImageUrl(meetup.imageId)"/>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <!-- meetup description -->
            <h3>Описание</h3>
            <meetup-description :description="meetup.description" />
            <meetup-agenda :agenda="meetup.agenda"/>
          </div>
          <div class="meetup__aside">
            <meetup-info :date="getDate(meetup.date)"
                         :organizer="meetup.organizer"
                         :place="meetup.place"
            />
          </div>
        </div>
      </div>
    </div>`,
};

export default MeetupView;
