<template>
  <div class="filters">
    <div>
      <div
        class="filter"
        v-if="search">
        <span class="filter-text">
          Search:
          <span
            class="active-chip"
            @click="removeSearch">
            {{ search }}
            <img src="../../../assets/images/close.svg">
          </span>
        </span>
      </div>
      <div class="filter">
        <span
          class="filter-text"
          v-for="(filterMap, filterKey) in filterMaps"
          v-if="filterMap.length">
          <span class="is-capitalized">{{ filterKey }}</span>:
          <span
            v-for="filter of filterMap"
            @click="removeFilter(filterKey, filter)"
            class="active-chip">
            {{ filterValue(filterKey, filter) }}
            <img src="../../../assets/images/close.svg">
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import {FILTER_VALUE, FILTERS, SEARCH} from '../../../store/modules/projects/getter-types';
  import {SET_FILTER, SET_SEARCH} from '../../../store/modules/projects/mutation-types';
  import {TOGGLE_TECHNOLOGY} from '../../../store/modules/technologies/mutation-types';
  import {FilterTypes} from '../../../store/modules/projects/filter-types';

  export default Vue.extend({
    computed: {
      ...mapGetters({
        search: SEARCH,
        filterMaps: FILTERS
      })
    },
    methods: {
      filterValue(filterKey: string, id: number): string {
        return this.$store.getters[FILTER_VALUE](filterKey, id);
      },
      removeSearch() {
        this.$store.commit(SET_SEARCH, '');
      },
      removeFilter(filterKey: string, id: number) {
        if (filterKey === FilterTypes.TECHNOLOGIES) this.$store.commit(TOGGLE_TECHNOLOGY, {id});
        this.$store.commit(SET_FILTER, {key: filterKey, value: id});
      }
    }
  });
</script>


<style lang="scss" scoped>
  @import '../../../styles/variables';

  .filters {
    margin: 10px 0;
  }

  .filter {
    margin-right: 20px;

    &-text {
      color: $text-secondary;
      font-size: 14px;
      margin-left: 6px;

      .active-chip {
        display: inline-block;
        padding: 2px 6px;
        background-color: $gray-237;
        color: $gray-38;
        cursor: pointer;
        margin-right: 6px;
        margin-bottom: 6px;

        img {
          position: relative;
          top: 2px;
          width: 12px;
        }

        &:hover {
          background-color: $gray-194;
        }
      }
    }

    &-img {
      cursor: pointer;
      height: 27px;
    }

  }

</style>
