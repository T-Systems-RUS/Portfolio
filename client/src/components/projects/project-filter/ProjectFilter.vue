<template>
  <div class="filter">
    <Accordion
      :name="model.name"
      :opened="model.opened"
      @update:opened="model.opened = !model.opened"
      v-for="model in models">
      <div
        v-for="item in model.items"
        :key="item.value">
        <div class="filter-item">
          <Checkbox :checked = "item.checked"
                    v-on:update:checked="handleFilterAction(item, 'line')"/>
          <span class="title is-5 is-size-16 is-uppercase">{{ item.value }}</span>
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
          models: new Array<IProjectFilter>()
        }
      },
      created() {
        // TODO make it in computed property after moving constants to db
        this.models = Object.keys(Constants).map(key => {
          const model: IProjectFilter = {
            name: key,
            opened: true,
            items: this.createModelForCheckboxes(Constants[key])
          };

          return model;
        });

        const customers: IProjectFilter = {
          name: 'Customers',
          opened: true,
          items: this.createModelForCheckboxes(this.$store.state.projects.customers)
        };
        this.models.push(customers);
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
        },

        // Model for checkboxes must have a label
        // and boolean property checked
        createModelForCheckboxes(source: String[]) :IProjectFilterCheck[]{
          return source.map(item =>  new Object({
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
