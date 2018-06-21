<template>
  <footer class="footer container">
    <router-link
      :to="{ name: 'Change', params: { mode: 'edit' }}"
      append
      class="footer-button">
      <img src="./assets/edit.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Edit</span>
    </router-link>
    <!--<a class="footer-button">-->
    <!--<img src="../assets/copy.svg">-->
    <!--<span class="title is-5 is-size-16 is-uppercase is-block">Create copy</span>-->
    <!--</a>-->
    <!--<a class="footer-button">-->
    <!--<img src="../assets/history.svg">-->
    <!--<span class="title is-5 is-size-16 is-uppercase is-block">Project history</span>-->
    <!--</a>-->
    <a
      class="footer-button"
      @click="generatePresentation()">
      <img src="./assets/presentation.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Presentation</span>
    </a>
    <a
      class="footer-button"
      @click="deleteProject()">
      <img src="./assets/trash.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Delete project</span>
    </a>
  </footer>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {GENERATE_PRESENTATION_SINGLE} from '../../../store/modules/projects/action-types';

  export default Vue.extend({
    methods: {
      generatePresentation() {
        this.$store.dispatch(GENERATE_PRESENTATION_SINGLE);
      },
      deleteProject() {
        this.$emit('delete');
      }
    }
  });
</script>
<style lang='scss' scoped>
  @import '../../../styles/variables';

  .footer {
    align-items: center;
    display: flex;
    height: $footer-bar-height;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: $white;

    &-button {
      flex: 1;
      text-align: center;

      img {
        width: 24px;
        margin-bottom: 5px;
      }
    }

  }
</style>
