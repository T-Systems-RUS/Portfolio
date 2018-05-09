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
                    @update:checked="handleFilterAction(item, model.name)"/>
          <span class="title is-5 is-size-16 is-uppercase">{{ item.value }}</span>
        </div>
      </div>
    </Accordion>
    <Accordion
      name = "Technologies"
      :opened="accordionOpened"
      @update:opened="accordionOpened = !accordionOpened">
      <technology-picker/>
    </Accordion>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {IProject} from '../../../shared/interfaces/IProject';
  import Accordion from '../../common/Accordion/Accordion.vue';
  import Checkbox from '../../common/Checkbox/Checkbox.vue';
  import TechnologyPicker from '../../technologies/technology-picker/TechnologyPicker.vue';
  import {IProjectFilter, IProjectFilterCheck} from './IProjectFilter';
  import * as types from '../../../store/modules/projects/project-types';
  import {IModel} from '../../../shared/interfaces/IModel';
  import {IProgram} from '../../../shared/interfaces/IProgram';
  import {Util} from "../../../shared/classes/Util";

  export default Vue.extend({
    data() {
      return {
        accordionOpened: true,
        accordionModels: [] as IProjectFilter[]
      };
    },
    created() {
      this.$store.dispatch(types.FETCH_ADDONS);
    },
    computed: {

      models(): IProjectFilter[] {
        const addons = this.$store.getters[types.GET_ADDONS];
        this.accordionModels = [] as IProjectFilter[];

        Object.keys(addons).forEach(key => {
          const model: IProjectFilter = {
            name: key,
            opened: true,
            items: this.createModelForCheckboxes(addons[key])
          };

          this.accordionModels.push(model);
        });

        return this.accordionModels;
      }
    },
    components: {
      Accordion,
      Checkbox,
      TechnologyPicker
    },

    methods: {
      // re render checkbox
      // will be used later for project filtering via store
      handleFilterAction(item: IProjectFilterCheck, key: string) {
        item.checked = !item.checked;
        const property = Util.mapNameToProperty(key);
        this.$store.commit(types.SET_FILTER, { key: property, value: item.id});
      },

      // Model for checkboxes must have a label
      // and boolean property checked
      createModelForCheckboxes(source: IModel[]) :IProjectFilterCheck[] {
        return source.map(item => new Object({
              value: item.name,
              checked: false,
              id: item.id
            })
          ) as IProjectFilterCheck[];
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
