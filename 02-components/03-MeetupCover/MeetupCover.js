const MeetupCover = {
  name: 'MeetupCover',

  props: {
    title: String,
    link: String,
  },

  template: `
    <div class="meetup-cover" :style="link && { '--bg-url': \`url('\${link}')\` }">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
};

export default MeetupCover;
