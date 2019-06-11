<template>
  <div id='view-collection'>
    <!-- toolbar -->
    <v-toolbar fixed id="titlebar">
      <v-flex xs2>
        <router-link to="/" class='no-under'>
          <v-btn flat icon class='add-thing'>
            <v-icon color="#DF5C46">arrow_back</v-icon>
          </v-btn>
        </router-link>
      </v-flex>
      <v-flex xs8>
        <v-toolbar-title class="page-title">{{ $route.params.collection }} Collection</v-toolbar-title>
      </v-flex>
    </v-toolbar>
    
    <v-container class="inner">

    <div class='section'>
      <div class='section-title'>
        <h2 class='inline-block'>Trackers in this collection.</h2>
      
      </div>

      <!-- vanilla html/css -->
      <div id="grid">
        <div class='box' v-for="tracker in filterTrackers($route.params.collection)" v-bind:key="tracker.id">
          <router-link :to="tracker.path" v-bind:style="{'background-color': tracker.color, 'border-radius': '7px'}" class='box-text' >{{tracker.name}}</router-link>
        </div>
      </div> 
    </div>
    </v-container>
    
    <router-link to="/add" class='no-under'>
      <v-btn large color="#DF5C46" id='small-button' class='colored-button'>Add a new tracker</v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ViewCollectionScreen',
  data () {
    return {

      collections: [{
        name: null
      }],
      trackers: [{
        name: null,
        unit: [],
        goal: null,
        collection: null
      }],
    }
  },
  methods: {
    filterTrackers: function (currentCollection) {
      return this.trackers.filter(function (tracker) {
        return tracker.collection === currentCollection
      })
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
    if (localStorage.getItem('trackers')) {
      try {
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('trackers')
      }
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

#grid{
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-evenly;
  /* padding-left: 10px; */
}

.section-title{
  margin-top: 10%;
}

</style>