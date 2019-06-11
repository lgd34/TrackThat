<template>
  <div id='edit-tracker'>
    <v-app>
      <!-- toolbar -->
      <v-toolbar fixed id="titlebar">
        <v-flex xs2>
          <router-link to="./" class='no-under'>
            <v-btn flat icon class='add-thing'>
              <v-icon color="#DF5C46">arrow_back</v-icon>
            </v-btn>
          </router-link>
        </v-flex>
        <v-flex xs8>
          <v-toolbar-title class="page-title">Edit {{ $route.params.tracker }} Tracker</v-toolbar-title>
        </v-flex>
      </v-toolbar>
      <!-- /toolbar -->

      <v-container class="inner">
    
        <div class='section'>
          <h2 class='prompt'>What do you want to track?</h2>
          <p>Tracker Name: <input v-model="newTrackerName"></p>
        </div>
    
        <div class='section'>
          <h2 class='prompt'>What units are we tracking?</h2>
          <!-- <div v-for="tracker in filterTrackers($route.params.id)" v-bind:key="tracker.id"> -->
            <div v-if="this.twoUnits">
              <p>Tracker Units: <input v-model="newTrackerUnit1"></p>
              <p>Tracker Units: <input v-model="newTrackerUnit2"></p>
            </div>
          
            <div v-else>
              <p>Tracker Units: <input v-model="newTrackerUnit1"></p>
            </div>
          <!-- </div> -->
        </div>
    
        <div class='section'>
          <h2 class='prompt'>Write down any goals you have.</h2>
          <textarea v-model="newTrackerGoal"></textarea>
          <p class='optional'>(Optional)</p>
        </div>
      
        <div class='section'>
          <h2 class='prompt'>Add tracker to collection?</h2>
          <p>
            <select v-model="NewTrackerCollection">
              <option v-for="collection in collections" v-bind:key="collection.id">{{collection.name}}</option>
            </select>
          </p>
          <p class='optional'>(Optional)</p>
        </div>
    
    <router-link to="/" class='no-under'><v-btn block dark color="#DF5C46" @click="edit" class='submit-button'>Confirm Changes</v-btn></router-link>
    <v-btn block @click="warning" class='submit-button'>
        <div class='black-text'>Delete Tracker</div>
    </v-btn>
    <DeleteWarningPopup v-show="isPopupVisible" @close="closeWarning" @delete="remove"/>
    </v-container>

    </v-app>
  </div>
</template>

<script>
import DeleteWarningPopup from './DeleteWarningPopup.vue'
export default {
  name: 'EditTracker',
  components:{
    DeleteWarningPopup,
  },
  data () {
    return {
      collections: [{
        name: null
      }],
      entries:[],
      trackers: [], 
      trackerID: [], 
      path : null,
      currentTracker:[],
      entryUnit1:null, 
      twoUnits:null,
      entryUnit2:null,
      newTrackerName: null,
      newTrackerUnit1: null,
      newTrackerUnit2: null,
      newTrackerGoal: null,
      NewTrackerCollection: null,
      isPopupVisible: false
    }
  },

  
  mounted () {
console.log("id + " + this.$route.params.id);
    //this.getLocal();
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
    if (localStorage.getItem('trackerID')) {
      try {
        this.trackerID = JSON.parse(localStorage.getItem('trackerID'))
      } catch (e) {
        localStorage.removeItem('trackerID')
      }
    }
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
      } catch (e) {
        localStorage.removeItem('entries')
      }
    }
  for(var i =0; i < this.trackers.length; i++)
  {
    if(this.trackers[i].id == this.$route.params.id)
    {
      this.currentTracker.push(this.trackers[i]);
      this.newTrackerName = this.trackers[i].name;
      this.newTrackerGoal = this.trackers[i].goal;
      this.NewTrackerCollection = this.trackers[i].collection;
 
    if(this.trackers[i].unit.length == 2)
    {
      this.twoUnits = true;
      this.newTrackerUnit1 = this.trackers[i].unit[0];
      this.newTrackerUnit2 = this.trackers[i].unit[1];
    }else{
      this.twoUnits = false;
      this.newTrackerUnit1 = this.trackers[i].unit[0];
    }
      }
  }
  
 //   console.log(this.$route.params);
  },
  methods: {
    edit () {

        var newName = this.newTrackerName;
    for(var i =0; i < this.trackers.length; i++)
        {
          if(this.trackers[i].id == this.$route.params.id)
          {
            if (this.newTrackerName!=null) {this.trackers[i].name = this.newTrackerName};
            if (this.newTrackerGoal!=null) {this.trackers[i].goal = this.newTrackerGoal};
            if (this.NewTrackerCollection!=null) {this.trackers[i].collection = this.NewTrackerCollection};
            if (this.newTrackerName!=null) {this.trackers[i].path = '/view/' + this.$route.params.id + '/' + newName + '/'};

            if(this.trackers[i].unit.length == 2)
            {
              for(var j = 0; j < this.entries.length; j++)
              {
                if(this.entries[j].trackerID == this.$route.params.id)
                { 
                  this.entries[j].unit[0] = this.newTrackerUnit1;
                  this.entries[j].unit[1] = this.newTrackerUnit2;
                }
          }
          if (this.newTrackerUnit1!=null) {this.trackers[i].unit[0] = this.newTrackerUnit1};
          if (this.newTrackerUnit2!=null) {this.trackers[i].unit[1] = this.newTrackerUnit2};
        }else{
          if(this.newTrackerUnit1!=null) {this.trackers[i].unit[0] = this.newTrackerUnit1};

           for(var j = 0; j < this.entries.length; j++)
          {
            if(this.entries[j].trackerID == this.$route.params.id)
            {
              this.entries[j].unit[0] = this.newTrackerUnit1;
            }
          }
        }
      }    
      }
       
        this.cleanTrackerValues();
        this.save()
    }, 
    warning() {
      this.isPopupVisible = true;
    },
    closeWarning() {
      this.isPopupVisible = false;
    },
    
    getLocal()
    {
      this.trackers = JSON.parse(localStorage.getItem('trackers'));
       this.entries = JSON.parse(localStorage.getItem('entries'));
    },

    remove()
    {
      this.isPopupVisible = false;
      for (var i = 0; i < this.trackers.length; i++)
      {
          if(this.trackers[i].id == this.$route.params.id)
          {
            this.trackers.splice(i, 1);
          }
      }
       this.save ();
       this.$router.push('/')
    },
  

    save () {
      const parsed = JSON.stringify(this.trackers)
      localStorage.setItem('trackers', parsed)

      const parsedID = JSON.stringify(this.trackerID)
      localStorage.setItem('trackerID', parsedID)

      localStorage.setItem('entries', JSON.stringify(this.entries));

    }, 
    cleanTrackerValues()
    {
      this.newTrackerName = ''
      this.newTrackerUnit1 = ''
      this.newTrackerUnit2 = ''
      this.newTrackerGoal = ''
      this.newTrackerCollection = ''
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

#edit-tracker .inner {
  text-align: center;
}


.black-text {
  color: black;
}

.section{
  text-align: left;
  margin-bottom: 10%;
}

/* .prompt{
} */
</style>