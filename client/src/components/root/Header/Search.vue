<template>
  <div>
    <Autocomplete
      :placeholder="'Search projects...'"
      :value="autocompleteSearch"
      :items="projectNames"
      @suggest="setSuggestions($event)"
      @change="setSearch($event)"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import {AUTOCOMPLETE_SEARCH, PROJECT_NAMES} from '../../../store/modules/projects/getter-types';
  import {SET_AUTOCOMPLETE_SEARCH, SET_SEARCH} from '../../../store/modules/projects/mutation-types';

  export default Vue.extend({
    data() {
      return {
        searchToggled: false,
        items: ['test']
      };
    },
    computed: {
      ...mapGetters({
        autocompleteSearch: AUTOCOMPLETE_SEARCH
      }),
      projectNames(): string[] {
        // Only set items if there's a search
        return this.$store.getters[AUTOCOMPLETE_SEARCH] ? this.$store.getters[PROJECT_NAMES] : [];
      }
    },
    methods: {
      setSuggestions(value: string) {
        this.$store.commit(SET_AUTOCOMPLETE_SEARCH, value);
      },
      setSearch(value: string) {
        this.$store.commit(SET_SEARCH, value);
      }
    }
  });
</script>
