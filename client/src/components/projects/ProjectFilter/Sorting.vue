<template>
  <Accordion
    name="Sorting"
    :opened="sortingOpened"
    @update:opened="sortingOpened = !sortingOpened">
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="true"
        :label="'Name'"
        @toggle="toggle('name')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :label="'Production line'"
        @toggle="toggle('program.line.name')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :label="'Team size'"
        @toggle="toggle('schedules.length')"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :label="'Date modified'"
        @toggle="toggle('updatedAt')"/>
    </div>

    <Checkbox
      :checked.sync="reverse"
      @update:checked="toggleReverse()">
      Reverse
    </Checkbox>
  </Accordion>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SET_SORT, SET_SORT_REVERSE} from '../../../store/modules/projects/mutation-types';


  export default Vue.extend({
    data() {
      return {
        sortingOpened: true,
        reverse: true
      };
    },
    created() {
    },
    methods: {
      toggle(name: string) {
        this.$store.commit(SET_SORT, name);
      },
      toggleReverse() {
        this.$store.commit(SET_SORT_REVERSE, this.reverse);
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
