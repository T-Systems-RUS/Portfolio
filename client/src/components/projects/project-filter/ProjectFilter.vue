<template>
  <div class="project-filter">
    <Accordeon
          name="Production line"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            class="" 
            v-for="line in lines"
            :key="line"
          >
          <Checkbox /> 
          <span>{{ line }}</span>
        </div>
    </Accordeon>
    <Accordeon
          name="Program"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            class="" 
            v-for="program in programs"
            :key="program"
          >
            <Checkbox /> 
            <span>{{ program }}</span>
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
            <Checkbox /> 
            <span>{{ t }}</span>
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
            <Checkbox /> 
            <span>{{ domain }}</span>
          </div>
    </Accordeon>
    <Accordeon
          name="Customers"
          :opened="accordionOpened"
          @update:opened="accordionOpened=!accordionOpened"
        >
          <div
            class="" 
            v-for="customer in customers"
            :key="customer"
          >
            <Checkbox /> 
            <span>{{ customer }}</span>
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
            type: []
        }
      },

      components: {
          Accordeon,
          Checkbox
      },
      created() {
        const constants = Constants["project"];
        this.lines = Extension.getKeys(constants["lines"]);
        this.domains = constants["domains"];
        this.types = constants["types"];
        // this.programs = constants["lines"];
        console.log(constants["lines"]);
        console.log(this.programs);
      }
  });
</script>

<style lang="scss" scoped>
    @import '../../../styles/variables';


</style>
