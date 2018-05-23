<template>
  <div>
    <Autocomplete :value="search" :items="projectNames" @input="setSearch($event)"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import {PROJECT_NAMES, SEARCH, SET_SEARCH} from '../../../store/modules/projects/project-types';

  export default Vue.extend({
    data() {
      return {
        searchToggled: false,
        items: ['test']
      };
    },
    computed: {
      ...mapGetters({
        search: SEARCH
      }),
      projectNames(): string[] {
        // Only set items if there's a search
        return this.$store.getters[SEARCH] ? this.$store.getters[PROJECT_NAMES] : [];
      }
    },
    methods: {
      setSearch(value: string) {
        this.$store.commit(SET_SEARCH, value);
      }
    },
  });
</script>
