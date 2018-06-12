<template>
  <div class="filters">
    <div>
      <div
        class="filter"
        @click="generatePresentation()">
        <span class="filter-text">
          <span class="active-chip">
            <img src="./assets/presentation-file_outline.svg">
          </span>
        </span>
      </div>
      <div class="filter">
        <span class="filter-text">
          <span>Sorted by:</span>
          <span class="active-chip">
            {{ mapName(sort) }}
            <img
              src="./assets/export_outline.svg"
              :class="{'reverse': sortReverse}">
          </span>
        </span>
      </div>
      <div class="filter">
        <span class="filter-text">
          <span>Completion:</span>
          <span class="active-chip">
            {{ mapName(completion) }}
          </span>
        </span>
      </div>
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
  import {
    COMPLETION,
    FILTER_VALUE,
    FILTERS,
    SEARCH,
    SORT,
    SORT_FIELD_NAME,
    SORT_REVERSE
  } from "../../../store/modules/projects/getter-types";
  import {SET_FILTER, SET_SEARCH} from '../../../store/modules/projects/mutation-types';
  import {TOGGLE_TECHNOLOGY} from '../../../store/modules/technologies/mutation-types';
  import {FilterTypes} from '../../../store/modules/projects/filter-types';
  import {GENERATE_PRESENTATION} from '../../../store/modules/projects/action-types';

  export default Vue.extend({
    computed: {
      ...mapGetters({
        search: SEARCH,
        filterMaps: FILTERS,
        sort: SORT,
        completion: COMPLETION,
        sortReverse: SORT_REVERSE
      })
    },
    methods: {
      mapName(key: string) {
        return this.$store.getters[SORT_FIELD_NAME](key);
      },
      generatePresentation() {
        this.$store.dispatch(GENERATE_PRESENTATION);
      },
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
    display: inline-block;
    margin-right: 6px;

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

          &.reverse {
            transform: rotate(180deg);
          }
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
