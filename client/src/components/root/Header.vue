<template>
  <div class="header level">
    <div class="level-left">
      <div class="header-logo level-item">
        <img src="./assets/logo-tportfolio.svg">
      </div>
      <nav class="header-nav level-item">
        <a href="/" class="header-nav-item is-active">
          Projects
        </a>
        <a href="#" class="header-nav-item">
          Employees
        </a>
        <a href="#" class="header-nav-item">
          Technologies
        </a>
        <a href="#" class="header-nav-item">
          Statistik
        </a>
        <a href="#" class="header-nav-item">
          Help
        </a>
      </nav>
    </div>
    <div class="level-right">
        <a class="level-item">
          <img  src="./assets/search.svg" alt="">
        </a>
        <a class="level-item">
          <img  src="./assets/user.svg" alt="">
        </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../styles/variables';
  @import '~bulma/sass/utilities/mixins';


  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: $white;
    border-top: $top-border-height solid $magenta;
    height: $header-height;
    padding: 0 $side-padding;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);

    

    &-nav{
      margin-left: 20px;

      &-item{
        color:$text-color;
        margin-right: 30px;
        transition: all .3s;

        &.is-active{
          font-weight: bold;
        }

        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
</style>
