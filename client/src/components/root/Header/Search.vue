<template>
  <div>
    <Autocomplete :items="projectNames" @input="setSearch($event)"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapGetters} from 'vuex';
  import {PROJECT_NAMES, SET_SEARCH} from '../../../store/modules/projects/project-types';

  export default Vue.extend({
    data() {
      return {
        searchToggled: false,
        items: ['test']
      };
    },
    computed: {
      ...mapGetters({
        projectNames: PROJECT_NAMES
      })
    },
    methods: {
      setSearch(value: string) {
        this.$store.commit(SET_SEARCH, value);
      }
    },
  });
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/initial-variables';
  @import '~bulma/sass/utilities/derived-variables';
  @import '~bulma/sass/components/dropdown';

  .dropdown {
    .input:focus {
      border: none;
      box-shadow: none;
    }
  }
</style>
