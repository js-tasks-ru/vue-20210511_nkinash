<template>
  <div id="app" class="page container">
    <the-toaster ref="toaster" />
    <p>
      <button @click="success">Add Success Message</button>
      <button @click="error">Add Error Message</button>
    </p>
  </div>
</template>

<script>
import TheToaster from './components/TheToaster';

export default {
  name: 'App',

  components: { TheToaster },

  methods: {
    success() {
      this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString());
    },

    error() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
    },
  },
};
</script>

<style></style>
