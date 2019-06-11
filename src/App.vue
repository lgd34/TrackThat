// single file componenet.
<template>
  <div id="app">
    <transition name="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
.out-in-enter-active {
        transition-delay: 0.4s;
        transition-duration: 0.4s;
    }
    .out-in-enter {
        transition-delay: 0.4s;
        transition-duration: 0.4s;
        opacity: 0;
    }
    .out-in-leave-active {
        transition: all 0.4s;
        opacity: 0;;
    }

  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
