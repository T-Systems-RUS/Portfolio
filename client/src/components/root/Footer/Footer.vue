<template>
  <footer class="footer container">
    <router-link
      to="edit"
      append
      class="footer-button">
      <img src="../assets/edit.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Edit</span>
    </router-link>
    <a class="footer-button">
      <img src="../assets/copy.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Create copy</span>
    </a>
    <a class="footer-button">
      <img src="../assets/history.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Project history</span>
    </a>
    <a class="footer-button">
      <img src="../assets/image.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Upload image</span>
    </a>
    <a class="footer-button">
      <img src="../assets/trash.svg">
      <span class="title is-5 is-size-16 is-uppercase is-block">Delete project</span>
    </a>
  </footer>
</template>

<style lang='scss' scoped>
  @import '../../../styles/variables';

  .footer {
    align-items: center;
    display: flex;
    height: $footer-bar-height;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: $white;

    &-button {
      flex:1;
      text-align: center;

      img {
        margin-bottom: 5px;
      }
    }


  }
</style>
