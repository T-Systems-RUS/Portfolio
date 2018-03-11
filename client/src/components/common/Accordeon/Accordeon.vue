<template>
    <div class="accordeon">
        <div class="accordeon-header">
            <span>{{ name }}</span>
            <div class="accordeon-button is-pulled-right" @click="closed=!closed">
                <img v-if="closed" src="../assets/arrowUp.svg" alt="">
                <img v-if="!closed" src="../assets/arrowDown.svg" alt="">
            </div>
        </div>
        <div class="accordeon-body">
            <div v-for="item in items"
                      :key="item"
                      >
                <Checkbox v-bind:label="item" />
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
        data: function(){
            return {
                closed: false
            }
        },
        props: {
            name: {
                type: String,
                required: true
            },
            items: Array
        }
    })
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