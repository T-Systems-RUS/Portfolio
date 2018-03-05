<template>
  <div
    class="checkbox"
    @click="toggleCheck">
    <img
      class="check"
      src="./check.svg"
      v-if="checkedValue"
    >
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Checkbox',
    props: {
      checked: Boolean
    },
    computed: {
      checkedValue(): boolean {
        return this.checked;
      }
    },
    methods: {
      toggleCheck() {
        this.$emit('update:checked', !this.checked);
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  $checkbox-size: 22px;
  $checkbox-background-color: #ededed;
  $checkbox-background-color-hover: #dbdbdb;
  $checkbox-background-color-active: #c7c7c7;
  $checkbox-border-color: #b2b2b2;

  .checkbox {
    width: $checkbox-size;
    height: $checkbox-size;
    background-color: $checkbox-background-color;
    border-radius: $telekom-radius;
    border: 1px solid $checkbox-border-color;
    transition: all 200ms ease;

    .check {
      position: absolute;
    }

    &:hover {
      background-color: $checkbox-background-color-hover;
    }

    &:active {
      background-color: $checkbox-background-color-active;
    }
  }
</style>
