<template>
  <div class="technology-panel">
    <p
      class="title is-6 is-size-16 is-margin-7">
      {{ domain }}
    </p>
    <chip
      v-for="technology in technologies"
      :key="technology.id"
      :name="technology.name"
      :selected = "technology.active"
      :id="technology.id"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Chip from '../../common/Chip/Chip.vue';
  import {ITechnology} from "../../../shared/interfaces/ITechnology";


  export default Vue.extend({
    components: {
      Chip
    },
    props: {
      domain: {
        type: String,
        required: true
      },
      technologies: {
        required: true
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .technology-panel {
    position: relative;

    .is-margin-7 {
      margin-bottom: 7px;
    }
  }
</style>
