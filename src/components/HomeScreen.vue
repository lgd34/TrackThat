<template>
  <div id='home-screen'>
    <v-app>

      <v-toolbar fixed id="titlebar">
        <v-flex xs12>
          <v-toolbar-title class="page-title"> Track That</v-toolbar-title>
        </v-flex>
      </v-toolbar>
      
      <v-container class="inner">
        <div class='section section-top'>
          <h2 class='greeting'>Hi, {{username}}!</h2>
          <p class='message'>It's a beautiful day to achieve your goals.</p>

          <div class='solid'>
            <h3>Goals</h3>
            <div v-if="goalsPresent">
              <div v-for="tracker in trackers" v-bind:key="tracker.id">
                <p class='message'>{{tracker.goal}}</p>
              </div>
            </div>
            <div v-else>
              <p> None yet!</p>
            </div>
          </div>
        </div>

        <div class='section'>
          <div class='section-title'>
            <h2 class='inline-block'>Trackers</h2>
              <router-link to="/add" class='colored-button'>
                <v-btn fab dark small color="#DF5C46" class='add-thing'>
                  <v-icon>add</v-icon>
                </v-btn>
              </router-link>
          </div>
        </div>
        <div class='box-container'>
            <div class='box' v-for="tracker in trackers" v-bind:key="tracker.id" v-if="tracker">
              <router-link :to="tracker.path" v-bind:style="{'background-color': tracker.color, 'border-radius': '7px'}" class='box-text'>{{tracker.name}}</router-link>
            </div>
          </div>

        <div class='section'>
          <h2 class='inline-block'>Collections</h2> 
          <v-btn fab dark small color="#DF5C46" class='add-thing' @click="showModal">
            <v-icon>add</v-icon>
          </v-btn>
          
          <router-link to="/editCollection/">
            <v-btn flat color='#DF5C46' class='inline-block right edit'>Edit</v-btn>
          </router-link>
        </div>
        <div class='box-container'>
            <div class='box' v-for="collection in this.collections" v-bind:key="collection.id">
              <router-link :to="collection.path" v-bind:style="{'background-color': collection.color, 'border-radius': '7px'}" class='box-text'>{{collection.name}}</router-link>
              </div>
          </div>

          <GetNamePopup v-show="nameCheck" @closeName="closeName"/>
          <AddCollectionPopup v-show="isPopupVisible" @close="closeModal"/>
          
      </v-container>
      
    </v-app>
  </div>
</template>

<script>
import AddCollectionPopup from './AddCollectionPopup.vue'
import GetNamePopup from './GetNamePopup.vue'
export default {
  components: {
    AddCollectionPopup,
    GetNamePopup
  },
  props:{
    to: Object
  },
  data(){
    return{
      username:'',
      trackers: [{
        id: '',
        path: '', 
        name: '',
        unit: [],
        goal: '',
        collection: ''
      }], 
       collections: [{
        name: '',
        path:''
      }],
    name: 'HomeScreen',
    isPopupVisible: false,
    nameCheck: false,
    goalsPresent: false

    }
  },
   mounted() {
    this.getLocal();
    if(this.username == null){
      this.username = 'User';
      this.nameCheck = true;
    }
    for(var i = 0; i<this.trackers.length; i++){
      if(this.trackers[i].goal != null){
        this.goalsPresent = true
      }
    }
  },
  methods:{
    showModal() {
        this.isPopupVisible = true;
      },
      closeModal() {
        this.isPopupVisible = false;
        this.getLocal();
      },
      closeName(){
        this.nameCheck = false;
        this.username = localStorage.getItem('userName');
      },
  getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
    this.collections = JSON.parse(localStorage.getItem('collections'));
    this.username = localStorage.getItem('userName');
  }
  
}
  
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#small-button{
  border: none;
}

/* OVERRIDE INNER FOR FULL SCROLL */

.inner{
  padding-left: 0;
  padding-right: 0;
}

.section{
  padding-left: 8%;
  padding-right: 8%;
}

.section-title{
  margin-top: 10%;
}

.box-container{
  padding-left: 8%;
  overscroll-behavior: contain;
}
</style>