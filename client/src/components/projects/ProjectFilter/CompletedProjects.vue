<template>
  <Accordion
    name="Project completion"
    :opened="sortingOpened"
    @update:opened="sortingOpened = !sortingOpened">
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'completion'"
        :checked="checkedOption === types.ALL"
        :label="mapName('all')"
        @toggle="toggle('all')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'completion'"
        :checked="checkedOption === types.OPENED"
        :label="mapName('opened')"
        @toggle="toggle('opened')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'completion'"
        :checked="checkedOption === types.COMPLETED"
        :label="mapName('completed')"
        @toggle="toggle('completed')"/>
    </div>
  </Accordion>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SET_COMPLETION} from '../../../store/modules/projects/mutation-types';
  import {COMPLETION, SORT_FIELD_NAME} from '../../../store/modules/projects/getter-types';
  import {CompleteTypes} from '../../../shared/enums/CompleteTypes';

  export default Vue.extend({
    data() {
      return {
        sortingOpened: true,
        reverse: true,
        types: CompleteTypes
      };
    },
    computed: {
      checkedOption(): string {
        return this.$store.getters[COMPLETION];
      }
    },
    methods: {
      mapName(key: string) {
        return this.$store.getters[SORT_FIELD_NAME](key);
      },
      toggle(name: string) {
        this.$store.commit(SET_COMPLETION, name);
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .radio-button-wrapper {
    margin-bottom: 4px;
  }
</style>
