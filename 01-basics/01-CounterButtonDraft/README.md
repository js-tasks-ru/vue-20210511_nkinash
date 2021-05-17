# CounterButtonDraft

Есть некоторый счётчик, это свойство, которое требуется выводить и изменять. Опишем его в `data`. 

Чтобы вывести текущее значение, воспользуемся синтаксисом `{{ count }}`.

Значение увеличивается по клику на кнопку, значит требуется установить обработчик события `@click`. Это может быть как отдельно описанный метод, так и изменение значения прямо в шаблоне: `@click="counter += 1"`.

```html
<!-- index.html -->
<div id="app">
  <button type="button" @click="increment">{{ count }}</button>
</div>
```
```javascript
// script.js
new Vue({
  data() {
    return {
      count: 0,
    }; 
  },

  methods: {
    increment() {
      this.count += 1;
    },
  },
}).$mount('#app');
```
