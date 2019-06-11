<template>
<div id='view-tracker'>
    <v-app>
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
          <v-toolbar-title class="page-title">{{ $route.params.tracker }} Tracker</v-toolbar-title>
        </v-flex>

        <router-link to="edit" color="#DF5C46" class='no-under'>
          <v-btn flat color='#DF5C46' class='inline-block right edit'>Edit</v-btn>
        </router-link>
      </v-toolbar>
    <!-- /toolbar -->

    <v-container class="inner">
        <div class='section-title'>
          <router-link to=entry class='colored-button'>
            <v-btn color="#DF5C46" class='add-thing'>New entry
              <v-icon right size="18px">add</v-icon>
            </v-btn>
          </router-link>
        </div>
        <div id="goalsContainer">
        <div class="section">
          <h2>Goals</h2>
          <v-card :flat="true">
           <p id="goalMessage">{{this.currentTrackerGoal}}</p>
          </v-card>
        </div>
        </div>

        <div class="section">
          <h2>Progress</h2>
            <v-card id="graph_box" :flat="true">
              <Chart :trackerID=$route.params.id></Chart>
              <v-btn id="switchButton" @click='switchUnits()' color="#DF5C46" class='colored-button'>Switch Units</v-btn>
            </v-card>
        </div>

        <v-container class="section" fluid-grid-list-md>
          <!-- All entry items repeated here -->
          <h2>Log</h2>
          <v-card class="scroll" max-height= "500px" :flat="true">
            <div v-if="logsPresent">
            <div id="entryList">
              <div v-for="entry in filterEntries($route.params.id)" v-bind:key="entry.id">
                <v-list class="tracker-log-entry">
                  <v-list-tile>
                    <span class='tracker-log-date'>
                      {{entry.date | formatDate}}
                    </span>
                  
                  <v-list-tile-content> 
                    <div v-if="entry.unit.length == 2">
                      <v-list-tile-title class="align-left">
                        {{entry.value[0]}} {{entry.unit[0]}}, {{entry.value[1]}} {{entry.unit[1]}}
                      </v-list-tile-title>
                    </div>
                    <div v-else>
                      <v-list-tile-title class="align-left">
                        {{entry.value[0]}} {{entry.unit[0]}}
                      </v-list-tile-title>
                    </div>
                    <v-list-tile-sub-title class="align-left">
                      {{entry.message}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <!-- edit entry button -->
                  <router-link :to="`editEntry/${entry.id}`" class='colored-button'>
                    <v-btn fab icon dark small color="#DF5C46" class='add-thing'>
                        <v-icon>edit</v-icon>
                    </v-btn>
                  </router-link>

                </v-list-tile>
                </v-list>
              </div>
            </div>
            </div>
            <div v-else>
              <p>Nothing here!</p>
            </div>
          </v-card>
          
      </v-container>
    </v-container>
  </v-app>
</div>
</template>

<script>
import Chart from './Chart.vue'
import Vue from 'vue'
import Storage from 'vue-web-storage'
import EventBus from '../eventBus.js'
import moment from 'moment'

Vue.use(Storage)

export default {
  name: 'ViewTrackerScreen',
  data()
  {
    return {
      trackers:[],
      entries:[],
      currentTracker:'',
      isTwoEntries:null,
      currentTrackerGoal:'',
      currentTrackerUnits:'', 
      uniqueDates:[],
      entryPath: '',
      tempEntries:[],
      logsPresent: false
    }
  },
  components: {
    Chart
  }
  ,
  created(){
    this.getLocal();
    this.currentTracker = this.$route.params.tracker;
    for (let index = 0; index < this.trackers.length; index++) {
      if(this.trackers[index].name == this.currentTracker)
      {
        this.currentTrackerGoal = this.trackers[index].goal; 
        this.currentTrackerUnits = this.trackers[index].unit;
      }}

  },
  mounted(){
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))

      } catch (e) {
        localStorage.removeItem('entries')
      }
    }
    if(this.currentTrackerGoal==null){
      document.getElementById("goalsContainer").style.display = "none"
    }
    else{
      document.getElementById("goalsContainer").style.display = "block"
    }

    for (let index = 0; index < this.entries.length; index++) {
      if(this.entries[index].trackerID == this.$route.params.id){
        this.tempEntries.push(this.entries[index].date);
        this.logsPresent = true
      }
    }
    this.uniqueDates = this.tempEntries.filter(function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
    })
    if(this.currentTrackerUnits.length <= 1 || this.uniqueDates.length <=2){
      document.getElementById("switchButton").style.display = "none"
    }
  },
  methods: {
    filterEntries: function (currentTracker) {
      return this.entries.filter(function (entry) {
        return entry.trackerID === currentTracker
      })
    },
    getLocal()
  {
    this.trackers = JSON.parse(localStorage.getItem('trackers'));
  },
    switchUnits () {
      EventBus.$emit('switchUnits', this.$route.params.id)
    }
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format('llll').slice(0, -15);
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
h2 {
  text-align: left;
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


#goalMessage, #graph_box{
  text-align:left;
}

#graph_box{ 
  /* max-width: 90%; */
  padding:0%;
  text-align: center;
}

.v-card {
  margin-top: 5%;
  padding:5%;
}

#graph_box{
  padding: 0%;
}

.scroll {
  overflow-y: auto;
  max-height: 350px;
}

.section-title {
  text-align: center;
}

.link{
  text-align:center;
  font-size: 16px;
}

.inner{
  margin-top: 50px;
}

</style>