<template>
  <div class="technology-picker">
    <div
      class="technology-picker-search input"
      v-if="technologies.length">
      <img
        class="input-image"
        src="../assets/search.svg">
      <input
        class="input-box with-image"
        type="text"
        placeholder="Search technology"
        v-model = "search"
        @change = "filterTechnologies(search)">
    </div>
    <chip
      v-for="technology in technologies"
      :key="technology.id"
      :name="technology.name"
      :id="technology.id.toString()"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Chip from '../../common/Chip/Chip.vue';
  import * as types from '../../../store/modules/technologies/technology-types';
  import {ITechnology} from '../../../shared/interfaces/ITechnology';

  export default Vue.extend({
    data() {
      return {
        search: ''
      };
    },
    components: {
      Chip
    },
    created() {
      this.$store.dispatch(types.FETCH_TECHNOLOGIES);
    },
    computed: {
      technologies(): ITechnology[] {
        return this.$store.state.technologies.technologies;
      }
    },
    methods: {
      filterTechnologies(search: string) {
        console.log(search);
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .technology-picker {
    position: relative;

    &-search {
      margin-bottom: 10px;
    }
  }
</style>
