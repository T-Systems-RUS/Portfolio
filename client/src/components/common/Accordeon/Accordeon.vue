<template>
  <div class="accordeon">
    <div class="accordeon-header">
      <span>{{ name }}</span>
      <div class="accordeon-button is-pulled-right">
        <img v-if="closedValue" src="../assets/arrowUp.svg">
        <img v-if="!closedValue" src="../assets/arrowDown.svg" alt="">
      </div>
    </div>
    <div class="accordeon-body">
      <div v-for="item in items"
                      :key="item"
                      >
                <Checkbox  />
            </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
   import Checkbox from '../Checkbox/Checkbox.vue';

  export default Vue.extend({
    name: 'Accordeon',
    components:{
        Checkbox
     },
    // props: {
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   closed: Boolean
    // },
    props:['name', 'closed', 'items'],
    computed: {
      closedValue(): boolean {
        return this.closed;
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
            height: 24px;
            width: 24px;
            line-height: 24px;
            vertical-align: middle;
            text-align: center;
            border-radius: 50%;
        }
    }
</style>
