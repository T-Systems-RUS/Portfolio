<template>

</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';
  import {Util} from '../../shared/classes/Util';

  export default Vue.extend({
    data() {
      return {
        projects: []
      };
    },

    // Fetches posts when the component is created.
    created() {
      axios.get(Util.getApiUrl('projects'))
        .then(response => {
          this.projects = response.data
        });
    }
  });
</script>

<style scoped>

</style>
