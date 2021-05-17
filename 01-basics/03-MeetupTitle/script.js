import Vue from './vendor/vue.esm.browser.js';

// Требуется создать Vue приложение
/**
 * Не стесняйтесь разворачивать на кодревью))
 * Хочу узнать, Как пишут на Vue нормальные люди)
 * @type {Vue}
 */
const app = new Vue({
  data() {
    return {
      checked: 0,
      title: ''
    };
  },
  watch: {
    checked(value) {
      this.getTitle(value);
    }
  },
  methods: {
    getTitle(item) {
      fetch('https://course-vue.javascript.ru/api/meetups/' + item)
        .then((res) => res.json())
        .then(res => this.title = res.title);
    }
  }
});

app.$mount('#app');
