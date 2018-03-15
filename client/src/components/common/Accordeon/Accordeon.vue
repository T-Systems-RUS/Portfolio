<template>
  <div class="accordeon">
    <div class="accordeon-header">
      <span>{{ name }}</span>
      <div class="accordeon-button is-pulled-right" 
           @click="toggleOpened">
        <img v-if="openedValue" src="../assets/arrowUp.svg">
        <img v-if="!openedValue" src="../assets/arrowDown.svg">
      </div>
    </div>
    <div v-if="opened" class="accordeon-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Accordeon',

    props: ['name', 'opened'],
    computed: {

      // possibility to define accordeon default open/closed
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

    .accordeon{
        display: block;
        margin-bottom: 20px;

        &-header{
            font-weight: bold;
        }

        &-button{
            background-color: $lite-grey;
            display: inline-block;
            cursor: pointer;
            height: 24px;
            width: 24px;
            line-height: 24px;
            vertical-align: middle;
            text-align: center;
            border-radius: 50%;
        }

        &-body{
          margin-top: 15px;
        }
    }
</style>
