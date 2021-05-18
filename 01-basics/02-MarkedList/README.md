# MarkedList

В данных приложения будем хранить не только список Email-ов, но и текущее введённое значение. Это значение привяжем к форме через директиву двустороннего связывания `v-model`.

Для получения данных о выделенных элементах списка можно создать вычисляемое свойство, которое возвращает список объектов с Email и флагов выделения.

```html
<div id="app">
  <input type="text" v-model="marker" />
  <ul>
    <li v-for="{ email, marked } in markedEmails" :class="{ marked }">{{ email }}</li>
  </ul>
</div>
```

```javascript
new Vue({
  data() {
    return {
      marker: '',
      emails,
    };
  },

  computed: {
    markedEmails() {
      return this.emails.map((email) => ({
        email,
        marked: Boolean(this.marker) && email.includes(this.marker),
      }));
    },
  },
}).$mount('#app');
```
