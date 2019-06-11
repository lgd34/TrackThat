<template>
  <transition name="popup-fade">
  <div class="popup-backdrop">
    <div class="popup">
      <h2>What's your name?</h2>
      <p><input v-model="userName"></p>
      <v-btn color='#DF5C46' @click="add" class='colored-button'>Welcome!</v-btn>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'GetNamePopup',
  data(){
    return{
      userName:""
    }
  },
  methods:{
    add(){
      if (!this.userName) {
        return
      }
      localStorage.setItem('userName', this.userName)
      this.$emit('closeName');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .popup-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity .5s ease
}
</style>

