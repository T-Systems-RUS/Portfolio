<template>
  <div class="technology-picker">
    <input
      class="input"
      type="text"
      placeholder="Search technology"
      v-if="technologiesFiltered.length"
      v-model="search"
      @input="filterTechnologies()">
    <chip
      v-for="technology in technologiesFiltered"
      :key="technology.id"
      :name="technology.name"
      :selected = "technology.active"
      :id="technology.id"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import Chip from '../../common/Chip/Chip.vue';
  import {TECHNOLGOGIES_FILTERED, TECHNOLOGIES} from '../../../store/modules/technologies/getter-types';
  import {FETCH_TECHNOLOGIES} from '../../../store/modules/technologies/action-types';
  import {SET_TECHNOLOGIES_FILTER} from '../../../store/modules/technologies/mutation-types';

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
      this.$store.dispatch(FETCH_TECHNOLOGIES);
    },
    computed: {
      ...mapGetters({
        technologiesFiltered: TECHNOLGOGIES_FILTERED
      })
    },
    methods: {
      filterTechnologies() {
        this.$store.commit(SET_TECHNOLOGIES_FILTER, this.search);
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .technology-picker {
    position: relative;

    .input {
      margin-bottom: 10px;
    }
  }
</style>
