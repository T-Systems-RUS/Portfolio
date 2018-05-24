<template>
  <div>
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button class="button">
          <input
            v-model="inputValue"
            class="input"
            type="text"
            :placeholder="placeholderText"
            @keyup.up="selectUp"
            @keyup.down="selectDown"
            @keyup.enter="valueChanged">
        </button>
      </div>
      <div
        v-if="items.length"
        class="dropdown-menu">
        <div class="dropdown-content">
          <a
            v-for="item of items"
            :class="{'is-active': item == inputValue}"
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
    scrollPosition: number;
  }

  export default Vue.extend({
    props: ['items', 'value', 'placeholder'],
    data(): IAutocompleteData {
      return {
        scrollPosition: -1,
        placeholderText: this.placeholder || 'Input text...',
        inputValue: this.value
      };
    },
    methods: {
      valueChanged() {
        this.$emit('input', this.inputValue);
        this.scrollPosition = -1;
      },
      itemSelected(item: string) {
        this.inputValue = item;
        this.valueChanged();
      },
      selectUp() {
        if (this.scrollPosition > 0) {
          this.scrollPosition -= 1;
          this.setSelecteditemByIndex();
        } else {
          this.inputValue = '';
          this.scrollPosition = -1;
        }
      },
      selectDown() {
        if (this.scrollPosition < this.items.length - 1) {
          this.scrollPosition += 1;
          this.setSelecteditemByIndex();
        }
      },
      // Private
      setSelecteditemByIndex() {
        if (this.scrollPosition >= 0) {
          this.inputValue = this.items[this.scrollPosition];
        }
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/initial-variables';
  @import '~bulma/sass/utilities/derived-variables';
  @import '~bulma/sass/components/dropdown';

  .dropdown {

    &-trigger .button {
      padding: 0;
    }

    .input {
      border: none;

      &:focus {
        border: none;
        box-shadow: none;
      }
    }
  }
</style>
