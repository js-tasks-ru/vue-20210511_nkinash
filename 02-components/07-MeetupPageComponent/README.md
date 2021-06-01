# MeetupPageComponent

Требуется добавить метод получения данных с API, вызывать его в хуке жизненного цикла `mounted` или `created`. Полученные данные нужно хранить в данных (состоянии) компонента.

Важно начальным значением данных митапа иметь `null`, и не выводить `<meetup-view>`, пока нет данных митапа.

```javascript
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
```
