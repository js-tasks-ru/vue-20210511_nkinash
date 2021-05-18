import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

// Требуется создать Vue приложение

const app = new Vue({
  data() {
    return {
      meetupID: MEETUP_ID,
      meetupData: null
    }
  },
  computed: {
    meetup() {
      if (this.meetupData) {
        let meetupData = this.meetupData;
        return {
          ...meetupData,
          coverStyle: meetupData.imageId && { '--bg-url': `url(${getImageUrlByImageId(meetupData.imageId)})` },
          localeDate: this.formatDate(meetupData.date),
          dateOnlyString: new Date(meetupData.date).toISOString().split('T')[0],
          agenda: this.meetupData.agenda.map((item) => ({
            ...item,
            icon: this.icon(item.type),
            time: item.startsAt + ' - ' + item.endsAt,
            title: this.getTitle(item)
          }))
        }
      }
    },
  },
  methods: {
    getMeetupData() {
      fetch(API_URL + '/meetups/' + this.meetupID)
        .then((res) => res.json())
        .then(res => this.meetupData = res)
    },
    icon(type) {
      return `/assets/icons/icon-${agendaItemIcons[type]}.svg`;
    },
    getTitle(item) {
      if (item.title) return item.title;
      return agendaItemDefaultTitles[item.type];
    },
    formatDate(date) {
      return new Date(date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  watch: {
    meetupID() {
      this.getMeetupData()
    }
  },
  mounted() {
    this.getMeetupData();
  }
});

app.$mount('#app');
