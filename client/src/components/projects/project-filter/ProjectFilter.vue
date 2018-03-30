<template>
  <div class="filter">
    <Accordion
      :name="model.name"
      v-for="model in models"
    >
      <div
        v-for="item in model.items"
        :key="item.value"
      >
        <div class="filter-item">
          <Checkbox :checked = "item.checked"
                    v-on:update:checked="handleFilterAction(item, 'line')"/>
          <span class="title is-5 is-size-16 is-uppercase">{{ item.value }}</span>
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
            :key="customer.value"
          >
            <div class="filter-item">
              <Checkbox :checked = "customer.checked"
                        v-on:update:checked="handleFilterAction(customer, 'customer')" />
              <span class="title is-5 is-size-16">{{ customer.value }}</span>
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
  import Constants from '../../../shared/constants/project.constants';
  import {IProjectFilter, IProjectFilterCheck} from './IProjectFilter';


  export default Vue.extend({
      data() {
        return {
          customerAccordionOpened: true
        }
      },
      computed: {
        models() :IProjectFilter[] {
          return Object.keys(Constants).map(key => {
            const model: IProjectFilter = {
              name: key,
              opened: true,
              items: this.createModelForCheckboxes(Constants[key])
            };

            return model;
          })
        },
        // customers come from parent
        // no customers in project.constants.ts
        convertedCustomers(): IProjectFilterCheck[] {
          return this.createModelForCheckboxes(this.$store.state.projects.customers);
        }
      },

      components: {
          Accordion,
          Checkbox
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
        createModelForCheckboxes(sourse: String[]) :IProjectFilterCheck[]{
          return sourse.map(item =>  new Object({
              value: item,
              checked: false
            })
          ) as IProjectFilterCheck[]
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
