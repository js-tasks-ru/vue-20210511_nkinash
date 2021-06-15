<script>
  export default {
    name: 'Counter',
    props: {
      count: {
        type: Number,
        default: 0
      }
    },

    model: {
      prop: 'count',
      event: 'increment',
      default: 0
    },
    methods: {
      increment() {
        this.$emit('increment', this.count + 1);
      }
    },
  };
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>


<style></style>
