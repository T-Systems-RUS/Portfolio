<template>
  <div>
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button class="button">
          <input
            v-model="value"
            @input="valueChanged()"
            class="input"
            type="text"
            placeholder="Input text...">
          <span class="icon is-small">
            <i class="fas fa-angle-down"></i>
          </span>
        </button>
      </div>
      <div
        v-if="items.length"
        class="dropdown-menu">
        <div class="dropdown-content">
          <a v-for="item of items"
             @click="itemSelected(item)"
             class="dropdown-item">
            {{ item }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  interface IAutocompleteData {
    value: string;
  }

  export default Vue.extend({
    props: ['items'],
    data(): IAutocompleteData {
      return {
        value: ''
      };
    },
    methods: {
      valueChanged() {
        this.$emit('input', this.value);
      },
      itemSelected(item: string) {
        this.value = item;
        this.valueChanged();
      }
    }
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
