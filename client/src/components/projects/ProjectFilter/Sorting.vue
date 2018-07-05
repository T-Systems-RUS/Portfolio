<template>
  <Accordion
    name="Sorting"
    :opened="sortingOpened"
    @update:opened="sortingOpened = !sortingOpened">
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="checkedOption === 'name'"
        :label="mapName('name')"
        @toggle="toggle('name')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="checkedOption === 'program.line.name'"
        :label="mapName('program.line.name')"
        @toggle="toggle('program.line.name')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="checkedOption === 'schedules.length'"
        :label="mapName('schedules.length')"
        @toggle="toggle('schedules.length')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="checkedOption === 'updatedAt'"
        :label="mapName('updatedAt')"
        @toggle="toggle('updatedAt')"/>
    </div>

    <Checkbox
      :checked="sortReverse"
      @update:checked="toggleReverse($event)">
      Reverse
    </Checkbox>
  </Accordion>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SET_SORT, SET_SORT_REVERSE} from '../../../store/modules/projects/mutation-types';
  import {SORT, SORT_FIELD_NAME, SORT_REVERSE} from '../../../store/modules/projects/getter-types';


  export default Vue.extend({
    data() {
      return {
        sortingOpened: true
      };
    },
    computed: {
      sortReverse(): boolean {
        return this.$store.getters[SORT_REVERSE];
      },
      checkedOption(): string {
        return this.$store.getters[SORT];
      }
    },
    methods: {
      mapName(key: string) {
        return this.$store.getters[SORT_FIELD_NAME](key);
      },
      toggle(name: string) {
        this.$store.commit(SET_SORT, name);
      },
      toggleReverse(reverse: boolean) {
        this.$store.commit(SET_SORT_REVERSE, reverse);
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
