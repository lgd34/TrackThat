<template>
  <transition name="popup-fade">
  <div class="popup-backdrop">
    <div class="popup">
      <h2>What do you want this collection's name to be?</h2>
      <p><input v-model="newCollectionName" :maxlength="15"></p>
      <div id="save-back">
      <v-btn id="small-button" @click="rename">Rename</v-btn>
      <v-btn id="small-button" @click="close">Close</v-btn>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'RenameCollectionPopup',
  data () {
    return {
      newCollectionName: null,
    }
  },
  mounted () {
    if (localStorage.getItem('collections')) {
      try {
        this.collections = JSON.parse(localStorage.getItem('collections'))
      } catch (e) {
        localStorage.removeItem('collections')
      }
    }
  },
  methods: {
    rename () {
      for (let index = 0; index < this.collections.length; index++) {
        if(this.collections[index].name == this.newCollectionName){
          return
        }
      }
      this.$emit('rename', this.newCollectionName);
    },
    close () {
      this.$emit('close');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


h2{
  margin-bottom: 5px;
}
  .popup-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 12;
  }

  .popup {
    align-content: center;
    border-radius: 4px;
    background: rgb(255, 255, 255);
    padding: 30px;
    box-shadow: 1px 1px 10px rgb(197, 197, 197);
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

#save-back{
  display: inline;
  text-align: center;
}

</style>
