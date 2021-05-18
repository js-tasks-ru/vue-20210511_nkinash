# MeetupTitle

В данных приложения будем хранить 2 свойства:
- `meetupId` с текущим выбранным `id`;
- `meetup` с данными текущего митапа.

У обоих свойств начальное значение - `null`.

Добавим метод получения с API данных митапа по ID.

Будем отслеживать через `watch` изменение `meetupId` и обновлять данные митапа, используя этот метод.

```javascript
new Vue({
  data() {
    return {
      meetupId: null,
      meetup: null,
    };
  },

  watch: {
    meetupId(newMeetupId) {
      this.fetchMeetup(newMeetupId);
    },
  },

  methods: {
    fetchMeetup(id) {
      fetch(`https://course-vue.javascript.ru/api/meetups/${id}`)
        .then((res) => res.json())
        .then((meetup) => (this.meetup = meetup));
    },
  },
}).$mount('#app');
```

В шаблоне выведем директивой `v-for` 5 радиокнопок. Каждой установим значение `value`, а значение через `v-model` привяжем к `meetupId`.

```html
<div id="app">
  <label v-for="i in 5">
    <input v-model="meetupId" type="radio" :value="i" /> {{ i }}
  </label>
  <hr />
  <h3 v-if="meetup">{{ meetup.title }}</h3>
</div>
```
