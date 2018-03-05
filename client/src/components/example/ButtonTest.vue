<template>
  <div>
    <button
      @click="pressButton"
      :class="{ 'green' : pressed }">Test Button
    </button>

    <div v-if="loading"> LOADING</div>

    <div
      v-for="(item, index) in items"
      :key="index">

      <span v-if="!item.editMode">{{ item.name }}</span>
      <span v-if="item.editMode">
        <input v-model="item.name">
      </span>

      {{ item.model }}
      <button @click="handleEdit(index, item)">Edit</button>
      <button @click="handleDelete(index)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TestService from './TestService';
  import {DELETE_ITEM, EDIT_ITEM, SET_ITEMS} from '../../store/mutation-types';

  interface ITableItem {
    editMode: boolean;
  }

  export default Vue.extend({
    name: 'ButtonTest',
    data() {
      return {
        pressed: false
      };
    },
    computed: {
      items(): {}[] {
        return this.$store.state.items;
      },
      loading(): boolean {
        return this.$store.state.loading;
      }
    },
    methods: {
      pressButton() {
        this.pressed = true;
        TestService.getItems().then(res => {
          this.items.concat(res.items);
          this.$store.commit(SET_ITEMS, res.items);
        });
      },
      handleEdit(index: number, item: ITableItem) {
        item.editMode = !item.editMode;
        this.$store.commit(EDIT_ITEM, {item, index});
      },
      handleDelete(index: number) {
        this.$store.commit(DELETE_ITEM, index);
      }
    }
  });
</script>

<style lang="scss" scoped>
  .green {
    background-color: green;
  }

  .red {
    background-color: red;
  }
</style>

