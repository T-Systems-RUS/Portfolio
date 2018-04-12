<template>
  <div class="technology-picker">
    <chip
      v-for="technology in technologies"
      :key="technology.id"
      :name="technology.name"></chip>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Chip from '../../common/Chip/Chip.vue';
  import * as types from '../../../store/modules/technologies/technology-types';
  import {ITechnology} from "../../../shared/interfaces/ITechnology";

  export default Vue.extend({
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
    }
  })
</script>

<style lang="scss" scoped>

</style>
