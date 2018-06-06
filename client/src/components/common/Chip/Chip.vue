<template>
  <div
    class="chip"
    :class ="{'is-selected': isSelected, 'is-disabled': !active}"
    @click="toggleActive">
    <!--TODO implement later-->
    <img
      class="chip-image"
      :src="imagePath"
      v-if="withImage && image">
    <span class="chip-content title is-4 is-size-14">{{ name }}</span>
    <!--TODO implement later-->
    <!--<span class="chip-button title is-4 is-size-14">X</span>-->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {SET_FILTER} from '../../../store/modules/projects/mutation-types';
  import {TOGGLE_TECHNOLOGY} from '../../../store/modules/technologies/mutation-types';
  import {FilterTypes} from '../../../store/modules/projects/filter-types';

  export default Vue.extend({
    props: {
      name: {
        type: String,
        required: true,
        default: ''
      },
      image: {
        type: String,
        required: false,
        default: ''
      },
      id: {
        type: Number,
        required: false
      },
      active: {
        type: Boolean,
        default: true
      },
      selected: {
        type: Boolean,
        default: false
      },
      withImage: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isSelected(): boolean {
        return this.selected;
      },
      imagePath(): string {
        return `./server/images/presentation/${this.image}`;
      }
    },
    methods: {
      toggleActive() {
        this.$store.commit(TOGGLE_TECHNOLOGY, {id: this.id});
        this.$store.commit(SET_FILTER, {key: FilterTypes.TECHNOLOGIES, value: this.id});
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  $height: 24px;
  $image: 20px;
  $image-max-width: 38px;
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
    position: relative;
    height: 30px;
    line-height: 25px;

    &-content, &-button {
      margin: 0;

    }

    &-button {
      margin-left: 7px;
      cursor: pointer;
    }

    &-image {
      height: $image;
      max-width: $image-max-width;
      vertical-align: middle;
      margin-right: 5px;
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
