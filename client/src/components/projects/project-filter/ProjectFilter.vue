<template>
  <div class="filter">
    <Accordion
          name="Production line"
          :opened="lineAccordionOpened"
          @update:opened="lineAccordionOpened=!lineAccordionOpened"
        >
          <div
            v-for="line in lines"
            :key="line.name"
          >
          <div class="filter-item">
              <Checkbox :checked = "line.checked"
                        v-on:update:checked="handleFilterAction(line, 'line')"/>
              <span class="title is-5 is-size-16 is-uppercase">{{ line.name }}</span>
          </div>
        </div>
    </Accordion>
    <Accordion
          name="Program"
          :opened="programAccordionOpened"
          @update:opened="programAccordionOpened=!programAccordionOpened"
        >
          <div
            v-for="program in programs"
            :key="program.name"
          >
            <div class="filter-item">
              <Checkbox :checked = "program.checked"
                        v-on:update:checked="handleFilterAction(program, 'program')"/>
              <span class="title is-5 is-size-16">{{ program.name }}</span>
            </div>
          </div>
    </Accordion>
    <Accordion
          name="Project type"
          :opened="typeAccordionOpened"
          @update:opened="typeAccordionOpened=!typeAccordionOpened"
        >
          <div
            v-for="t in types"
            :key="t.name"
          >
            <div class="filter-item">
              <Checkbox :checked = "t.checked"
                        v-on:update:checked="handleFilterAction(t, 'type')"/>
              <span class="title is-5 is-size-16">{{ t.name }}</span>
            </div>
          </div>
    </Accordion>
    <Accordion
          name="Domains"
          :opened="domainAccordionOpened"
          @update:opened="domainAccordionOpened=!domainAccordionOpened"
        >
          <div
            v-for="domain in domains"
            :key="domain.name"
          >
            <div class="filter-item">
              <Checkbox :checked = "domain.checked"
                        v-on:update:checked="handleFilterAction(domain, 'domain')"/>
              <span class="title is-5 is-size-16">{{ domain.name }}</span>
            </div>
          </div>
    </Accordion>
    <Accordion
          v-if="convertedCustomers && convertedCustomers.length"
          name="Customers"
          :opened="customerAccordionOpened"
          @update:opened="customerAccordionOpened=!customerAccordionOpened"
        >
          <div
            v-for="customer in convertedCustomers"
            :key="customer.name"
          >
            <div class="filter-item">
              <Checkbox :checked = "customer.checked"
                        v-on:update:checked="handleFilterAction(customer, 'customer')" />
              <span class="title is-5 is-size-16">{{ customer.name }}</span>
            </div>
          </div>
    </Accordion>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IProject} from '../../../shared/interfaces/IProject';
  import Accordion from '../../common/Accordion/Accordion.vue';
  import Checkbox from '../../common/Checkbox/Checkbox.vue';
  import Constants from '../../../shared/constants/constants';


  export default Vue.extend({
      data() {
        return {
            // properties for accordion sections open/closed
            lineAccordionOpened: true,
            programAccordionOpened: true,
            typeAccordionOpened: true,
            domainAccordionOpened: true,
            customerAccordionOpened: true,
            technologyAccordionOpened: true,

            // models for Accordion section
            lines: new Array(),
            domains: new Array(),
            programs: new Array(),
            types: new Array()
        };
      },

      computed: {
        // customers come from parent
        // no customers in constants.ts
        convertedCustomers(): any[] {
          return this.createModelForCheckboxes(this.$store.state.projects.customers);
        }
      },

      components: {
          Accordion,
          Checkbox
      },
      created() {
         // convert for Accordion section with checkboxes
         this.lines = this.createModelForCheckboxes(Constants['lines']);
         this.domains =  this.createModelForCheckboxes(Constants['domains']);
         this.types = this.createModelForCheckboxes(Constants['types']);
         this.programs = this.createModelForCheckboxes(Constants['programs']);
      },
      methods: {

        // re render checkbox
        // will be used later for project filtering via store
        handleFilterAction(item:any, key: string){
          item.checked = !item.checked;
          // computed  property convertedCustomers won't render automatically after
          // checkbox change
          if(key === 'customer') this.$forceUpdate();
        },

        // Model for checkboxes must have a label
        // and boolean property checked
        createModelForCheckboxes(sourse: String[]){
          return sourse.map(item =>  new Object({
              name: item,
              checked: false
            })
          )
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
