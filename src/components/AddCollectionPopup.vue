<template>
  <transition name="popup-fade">
  <div class="popup-backdrop">
    <div class="popup">
      <h2>Create Collection</h2>
      <p><input v-model="newCollectionName" :maxlength="15" placeholder="i.e., Fitness"></p>
      <div v-show='containsSpecChars'><p>Collection name should only contain numbers and/or letters.</p></div>
      <div id="save-back">
      <v-btn class='close-button' @click="close">Close</v-btn>
      <v-btn color='#DF5C46' class="small-button colored-button" @click="add">Save</v-btn>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'AddCollectionPopup',
  data () {
    return {
      collections: [],
      newCollectionName: null,
      newCollectionPath: null,
      containsSpecChars:false
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
    add () {
      let colorList = ['#5c46df', '#46df5c', '#df467d', '#467ddf', '#46dfa8', '#dfa946'];
      let randIndex = Math.floor(Math.random() * (colorList.length));
      let randomColor = colorList[randIndex];
      // console.log(randomColor);
      
      // ensure they actually typed something
      if (!this.newCollectionName) {
        return
      }

      // var isAlphanumeric = require('is-alphanumeric');
      // var exp  = '/^[\w\-\s]+$/';
      // steph regex
      var patt = new RegExp('^[A-Za-z0-9- ]+$');
      // console.log(patt);
      var result = patt.test(this.newCollectionName);
        if(!result)
        {
          this.containsSpecChars = true;
        }
        else {
          this.containsSpecChars = false;
          var trackerEntry = {
            'name': this.newCollectionName,
            'path' : '/collectionView/' + this.newCollectionName + '/',
            'color' : randomColor,
          }
          if(this.collections)
          this.collections.push(trackerEntry)
          this.newCollectionName = ''
          this.save()
          this.$emit('close');
        }
    },
    remove (x) {
      this.collections.splice(x, 1)
      this.save()
    },
    save () {
      const parsed = JSON.stringify(this.collections)
      localStorage.setItem('collections', parsed)
      this.$emit('close');
    },
    close() {
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
.close-button .v-btn__content {
  color: black;
}
</style>