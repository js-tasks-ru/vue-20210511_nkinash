import Vue from './vendor/vue.esm.browser.js';

// Требуется создать Vue приложение

const app = new Vue({
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    click() {
      this.counter++;
    }
  }
});

app.$mount('#app');
