<template>
  <div class="accordion">
    <div class="accordion-header">
      <span>{{ name }}</span>
      <div class="accordion-button is-pulled-right"
           @click="toggleOpened">
            <img src="../assets/arrowDown.svg"
              :class="{'is-closed' :openedValue}">
      </div>
    </div>
    <div v-if="openedValue" class="accordion-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'accordion',

    props: {
      name: {
        type: String
      },
      opened: {
        type: Boolean,
        default: true
      }
    },
    computed: {

      // possibility to define accordion default open/closed
      openedValue(): boolean {
        return this.opened;
      }
    },
    methods: {
      toggleOpened() {
        this.$emit('update:opened', !this.opened);
      }
    }
  });
</script>

<style lang="scss" scoped>
    @import '../../../styles/variables';

    $button-size: 24px;

    .accordion {
        display: block;
        margin-bottom: 20px;

        &-header{
            font-weight: bold;
        }

        &-button{
            background-color: $lite-grey;
            display: inline-block;
            cursor: pointer;
            height: $button-size;
            width: $button-size;
            line-height: $button-size;
            vertical-align: middle;
            text-align: center;
            border-radius: 50%;

            img.is-closed {
              transform: rotate(180deg);
            }
        }

        &-body{
          margin-top: 15px;
        }
    }
</style>
