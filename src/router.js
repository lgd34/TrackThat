import Vue from 'vue'
import Router from 'vue-router'
import HomeScreen from './components/HomeScreen.vue'
import AddTrackerScreen from './components/AddTrackerScreen.vue'
import ViewTrackerScreen from './components/ViewTrackerScreen.vue'
import ViewCollectionScreen from './components/ViewCollectionScreen.vue'
import ScreenTemplate from './components/ScreenTemplate.vue'
import AddEntryScreen from './components/AddEntryScreen.vue'
import EditCollectionScreen from './components/EditCollectionScreen.vue'
import EditEntryScreen from './components/EditEntryScreen.vue'
import EditTracker from './components/EditTracker.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeScreen
    },
    {
      path: '/index.html',
      name: 'Home',
      component: HomeScreen
    },
    {
      path: '/add',
      name: 'AddTrackerScreen',
      component: AddTrackerScreen
    },
    {
      path: '/view/:id/:tracker',
      name: 'ViewTrackerScreen',
      component: ViewTrackerScreen
    },
    {
      path: '/collectionView/:collection',
      name: 'ViewCollectionScreen',
      component: ViewCollectionScreen
    },
    {
      path: '/template',
      name: 'Template',
      component: ScreenTemplate
    },
    {
      path: '/view/:id/:tracker/entry',
      name: 'AddEntryScreen',
      component: AddEntryScreen
    },
    {
      path: '/editCollection',
      name: 'EditCollectionScreen',
      component: EditCollectionScreen
    },
    {
      path: '/view/:id/:tracker/editEntry/:entryid',
      name: 'EditEntryScreen',
      component: EditEntryScreen
    },
    {
      path: '/view/:id/:tracker/edit',
      name: 'EditTracker',
      component: EditTracker
    }
  ]
})
