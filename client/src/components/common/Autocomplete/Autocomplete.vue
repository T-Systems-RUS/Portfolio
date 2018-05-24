<template>
  <div>
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button class="button">
          <input
            v-model="inputValue"
            @input="valueChanged()"
            class="input"
            type="text"
            :placeholder="placeholderText">
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
    placeholderText: string;
    inputValue: string;
  }

  export default Vue.extend({
    props: ['items', 'value', 'placeholder'],
    data(): IAutocompleteData {
      return {
        placeholderText: this.placeholder || 'Input text...',
        inputValue: this.value
      };
    },
    methods: {
      valueChanged() {
        this.$emit('input', this.inputValue);
      },
      itemSelected(item: string) {
        this.inputValue = item;
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
