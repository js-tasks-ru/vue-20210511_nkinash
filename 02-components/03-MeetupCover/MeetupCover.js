const MeetupCover = {
  name: 'MeetupCover',
  props: {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  computed: {
    bgUrl() {
      return this.link ? `url(${this.link})` : null;
    },
    coverStyle() {
      return { '--bg-url': this.bgUrl }
    }
  },
  template: `
    <div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
};

export default MeetupCover;
