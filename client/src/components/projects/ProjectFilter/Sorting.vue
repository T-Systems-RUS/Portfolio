<template>
  <Accordion
    name="Sorting"
    :opened="sortingOpened"
    @update:opened="sortingOpened = !sortingOpened">
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="true"
        :label="'Name'"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="true"
        :label="'Production line'"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="true"
        :label="'Team size'"/>
    </div>
    <div class="radio-button-wrapper">
      <RadioButton
        :name="'sorting'"
        :checked="true"
        :label="'Date modified'"/>
    </div>
  </Accordion>
</template>

<script lang="ts">
  import Vue from 'vue';


  export default Vue.extend({
    data() {
      return {
        sortingOpened: true
      };
    },
    created() {
    },
    methods: {}
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .radio-button-wrapper {
    margin-bottom: 4px;
  }
</style>
