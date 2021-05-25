export default {
  name: 'MeetupInfo',
  props: {
    organizer: {
      required: true,
      type: String
    },
    place: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: Date
    },
  },
  computed: {
    dateOnlyString() {
      return new Date(this.date).toISOString().split('T')[0]
    },
    formatDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  },
  methods: {
    icon(type) {
      return `/assets/icons/icon-${type}.svg`;
    },
  },
  template: `
    <ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" :src="icon('user')" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" :src="icon('map')" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" :src="icon('cal-lg')" />
        <time :datetime="dateOnlyString">{{ formatDate }}</time>
      </li>
    </ul>`,
};
