<template>
  <div
    class="chip"
    :class  ="{'is-selected': isSelected, 'is-disabled': !active}"
    @click="toggleActive">
    <!--TODO implement later-->
    <!--<img class="chip-image" src="">-->
    <span class="chip-content title is-4 is-size-14">{{ name }}</span>
    <!--TODO implement later-->
    <!--<span class="chip-button title is-4 is-size-14">X</span>-->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SET_FILTER} from '../../../store/modules/projects/mutation-types';

  export default Vue.extend({
    data() {
      return {
        isSelected: false
      };
    },
    props: {
      name: {
        type: String,
        required: true,
        default: ''
      },
      id: {
        type: Number,
        required: false
      },
      active: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      toggleActive() {
        this.isSelected = !this.isSelected;
        this.$store.commit(SET_FILTER, {key: 'technologies', value: this.id});
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $height: 24px;
  $padding-sides: 12px;
  $padding-top: 0px;
  $margin: 10px;

  .chip {
    display: inline-block;
    cursor: pointer;
    border: 1px solid $border-color;
    margin-bottom: $margin;
    margin-right: $margin;
    padding: $padding-top $padding-sides;
    transition: all .4s;

    &-content, &-button {
      margin: 0;
    }

    &-button {
      margin-left: 7px;
      cursor: pointer;
    }

    &.is-disabled {
      //border: 1px solid $text-secondary;

      >span {
        color: $text-secondary;
      }
    }

    &.is-selected {
      background-color: $magenta;
      border: 1px solid $magenta;

      span {
        color: $white;
      }
    }
  }
</style>
