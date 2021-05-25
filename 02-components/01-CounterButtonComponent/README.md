# Компонент CounterButton

Компонент достаточно простой. Как в аналогичной задаче предыдущего модуля, создаём кнопку, но теперь работаем со входным параметром.

Важно, что параметр локально не изменяется, а новое значение возвращается родителю вместе с событием. 

```javascript
const CounterButton = {
  name: 'CounterButton',

  // Описываем модель компонента на параметр count с событием increment
  model: {
    prop: 'count',
    event: 'increment',
  },

  // Теперь текущее значение счётчика приходит от родителя через входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    increment() {
      // При клике на кнопку порождаем событие и отправляем новое значение
      this.$emit('increment', this.count + 1);
    },
  },

  template: `<button type="button" @click="increment">{{ count }}</button>`,
};
```
