<template>
  <div class="filter">
    <Accordeon
          name="Production line"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            v-for="item in lines"
            :key="item.line"
          >
          <div class="filter-item">
              <Checkbox :checked = "item.checked"
                        v-on:update:checked="handle($event, item)"/> 
              <span class="title is-5 is-size-16 is-uppercase">{{ item.line }}</span>
          </div>
        </div>
    </Accordeon>
    <Accordeon
          name="Program"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            v-for="program in programs"
            :key="program"
          >
            <div class="filter-item">
              <Checkbox /> 
              <span class="title is-5 is-size-16">{{ program }}</span>
            </div>
          </div>
    </Accordeon>
    <Accordeon
          name="Project type"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            class="" 
            v-for="t in types"
            :key="t"
          >
            <div class="filter-item">
              <Checkbox /> 
              <span class="title is-5 is-size-16">{{ t }}</span>
            </div>
          </div>
    </Accordeon>
    <Accordeon
          name="Domains"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            class="" 
            v-for="domain in domains"
            :key="domain"
          >
            <div class="filter-item">
              <Checkbox /> 
              <span class="title is-5 is-size-16">{{ domain }}</span>
            </div>
          </div>
    </Accordeon>
    <Accordeon
          v-if="customers && customers.length"
          name="Customers"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            class="" 
            v-for="customer in customers"
            :key="customer"
          >
            <div class="filter-item">
              <Checkbox /> 
              <span class="title is-5 is-size-16">{{ customer }}</span>
            </div>
          </div>
    </Accordeon>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {IProject} from '../../../shared/interfaces/project';
  import Accordeon from '../../common/Accordeon/Accordeon.vue';
  import Checkbox from '../../common/Checkbox/Checkbox.vue';
  import Constants from '../../../assets/constants/constants.json';
  import { Extension } from '../../../shared/classes/Extension';

  export default Vue.extend({
      data() {
        return {
            accordionOpened: true,
            lines: [],
            domains: [],
            programs:[],
            types: []
        };
      },
      
      props: {
        customers: {
            type: Array
        }
      },

      components: {
          Accordeon,
          Checkbox
      },
      created() {
        const constants = Constants["project"];
        this.lines = Extension.getKeys(constants["lines"]).map(
          item => new Object({
            line: item,
            checked: false
          })
        );
        this.domains = constants["domains"];
        this.types = constants["types"];
        this.programs = constants["programs"];
      },
      methods: {
        handle(event, item){
          item.checked = event;
          console.log(event, item);
        }
      }
  });
</script>

<style lang="scss" scoped>
    @import '../../../styles/variables';

    .filter{
      margin-right: 0;

      &-item{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        &>span{
          margin-left: 7px;
        }
      }
    }

</style>
