const MeetupDescription = {
  name: 'MeetupDescription',

  props: {
    description: String,
  },

  template: `<p class="meetup-description">{{ description }}</p>`,
};

export default MeetupDescription;
