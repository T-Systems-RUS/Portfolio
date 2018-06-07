<template>
  <div id="app">
    <Header/>
    <div class="view">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Header from './components/root/Header/Header.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      Header
    }
  });
</script>

<style lang="scss" scoped>
  @import './styles/variables';

  .view {
    margin-top: $header-height;
  }
</style>
