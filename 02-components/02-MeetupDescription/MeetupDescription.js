const MeetupDescription = {
  name: 'MeetupDescription',

  // Входные параметры
  props: {
    description: {
      type: String
    }
  },

  template: `<p class="meetup-description">{{ description }}</p>`,
};

export default MeetupDescription;
