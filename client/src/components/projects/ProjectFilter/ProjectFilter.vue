<template>
  <div class="filter">
    <Accordion
      :name="model.name"
      :opened="model.opened"
      @update:opened="toggleAccordion(model.name, !model.opened)"
      v-for="(model,index) in models"
      :key="index">
      <div
        v-for="item in model.items"
        :key="item.value">
        <div
          class="filter-item"
          :class="{'is-disabled': !item.active}">
          <Checkbox
            :checked="item.checked"
            @update:checked="handleFilterAction(item, model.name)"/>
          <span class="title is-5 is-size-16">{{ item.value }}</span>
        </div>
      </div>
    </Accordion>
    <Accordion
      name="Technologies"
      :opened="accordionOpened"
      @update:opened="accordionOpened = !accordionOpened">
      <TechnologyPicker/>
    </Accordion>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Accordion from '../../common/Accordion/Accordion.vue';
  import Checkbox from '../../common/Checkbox/Checkbox.vue';
  import TechnologyPicker from '../../technologies/TechnologyPicker/TechnologyPicker.vue';
  import {IProjectFilter, IProjectFilterCheck} from '../../../shared/interfaces/shared/IProjectFilter';
  import {IModel} from '../../../shared/interfaces/IModel';
  import {Util} from '../../../shared/classes/Util';
  import {FETCH_ADDONS} from '../../../store/modules/projects/action-types';
  import {ADDONS, PROJECT_FILTER} from '../../../store/modules/projects/getter-types';
  import {SET_FILTER, SET_ACCORDION} from '../../../store/modules/projects/mutation-types';

  export default Vue.extend({
    data() {
      return {
        accordionOpened: true
      };
    },
    created() {
      this.$store.dispatch(FETCH_ADDONS);
    },
    computed: {

      models(): IProjectFilter[] {
        return this.$store.getters[PROJECT_FILTER];
      }
    },
    components: {
      Accordion,
      Checkbox,
      TechnologyPicker
    },
    mounted() {
      this.models.forEach(item => this.$store.commit(SET_ACCORDION, {key: item.name, value: true}));
    },
    methods: {
      // re render checkbox
      // will be used later for project filtering via store
      handleFilterAction(item: IProjectFilterCheck, key: string) {
        this.$store.commit(SET_FILTER, {key: Util.mapNameToProperty(key), value: item.id});
      },
      toggleAccordion(key:string, value: boolean) {
        this.$store.commit(SET_ACCORDION, {key, value});
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/variables';

  .filter {
    margin-right: 0;

    &-item {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      &.is-disabled {

        span {
          color: $text-secondary2;
        }
      }

      & > span {
        margin-left: 7px;
      }
    }
  }

</style>
