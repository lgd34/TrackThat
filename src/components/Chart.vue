<template>
    <div id="container" class="svg-container"></div>
</template>
<script>
import * as d3 from 'd3'
import Vue from 'vue'
import EventBus from '../eventBus.js'

//console.log(entryData)
export default {
  name: 'Chart',
  props: {trackerID:''},
  data()
  {
    return {
      entries:[],
      trackers:[],
      entryData:[],
      entryValues:[],
      currentTracker: null,
      entryDates:[],
      unitSelector: '',
    }
  },
  mounted () {
    var usedDates = []
    this.unitSelector = 0
    var mydate = null
    if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('entries')
        localStorage.removeItem('trackers')
      }
    }
    for(var i = 0; i<this.trackers.length; i++)
    {
      if(this.trackers[i].id == this.trackerID)
      {
        this.currentTracker = this.trackers[i];
      }
    }
     for (let index = 0; index < this.entries.length; index++) {
      if(this.entries[index].trackerID == this.trackerID)
      {
        if(usedDates.includes(this.entries[index].date) == false && this.entries[index].value[this.unitSelector] != null){
          usedDates.push(this.entries[index].date)
          mydate = new Date(this.entries[index].date)
          mydate.setHours(0,0,0,0)
          mydate.setDate(mydate.getDate() + 1)
          this.entryData.push({value: this.entries[index].value[this.unitSelector], date: mydate})
          this.entryValues.push(this.entries[index].value[this.unitSelector])
          this.entryDates.push(mydate)
          this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
        }
      }}
    this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    const svg = d3.select(this.$el)
      // original
      // .append('svg')
      // .attr('id', 'dataChart')
      // .attr('width', 350)
      // .attr('height', 250)
      // .append('g')
      // .attr('transform', 'translate(0, 10)')

      // steph
      .append("div")
      .classed("svg-container", true) //container class to make it responsive
      .append("svg")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 -10 375 250")
      //class to make it responsive
      .classed("svg-content-responsive", true); 
  
    if(this.entryData.length >= 2){
    var x = d3.scaleTime().domain([new Date(Math.min.apply(null,this.entryDates)), new Date(Math.max.apply(null,this.entryDates))]).range([60, 340])
    var y = d3.scaleLinear().domain([0.95 * d3.min(this.entryValues), 1.05 * d3.max(this.entryValues)]).range([210, 0]).nice()
    var dateDifference = (new Date(Math.max.apply(null,this.entryDates)).getTime() - new Date(Math.min.apply(null,this.entryDates)).getTime())/(1000 * 3600 * 24)
    var createPath = d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.value) })
    
    var bottomAxis = null
    
    if (dateDifference <= 20) {
      bottomAxis = d3.axisBottom(x).ticks(3)
    }
    else {
      bottomAxis = d3.axisBottom(x).ticks(5)
    }
    var leftAxis = d3.axisLeft(y).ticks(5)
    svg.append('text')
      .attr("x", -105).attr("y", 10)
      .text(this.currentTracker.unit[this.unitSelector])
      .style("text-anchor", "middle")
      .attr('transform', 'rotate(270)')
      .style("font-size", "10pt")

    svg.append('text')
      .attr("x", 180).attr("y", 240)
      .text("Date").style("text-anchor", "middle")
      .style("font-size", "10pt")
      .style('font-family', 'Roboto')

    svg.append('g').call(bottomAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(0,210)')

    svg.append('g').call(leftAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(60,0)')
    
    svg.append('path')
      .attr('d', createPath(this.entryData))
      .attr('id', 'dataPath')
    }
    else{
      svg.append('text')
        .attr("x", 180).attr("y", 125)
        .text("Please add at least two entries on")
        .style("text-anchor", "middle")
      svg.append('text')
        .attr("x", 180).attr("y", 145)
        .text("different dates to see your progress!")
        .style("text-anchor", "middle")
    }

    EventBus.$on('switchUnits', function (ID) {
      this.trackerID = ID;

    
      if (localStorage.getItem('entries')) {
      try {
        this.entries = JSON.parse(localStorage.getItem('entries'))
        this.trackers = JSON.parse(localStorage.getItem('trackers'))
      } catch (e) {
        localStorage.removeItem('entries')
        localStorage.removeItem('trackers')
      }
    }

     for(var i = 0; i<this.trackers.length; i++)
    {
      if(this.trackers[i].id == this.trackerID)
      {
        this.currentTracker = this.trackers[i];
      }
    }
      this.entryValues=[]
      this.entryData = []
      this.entryDates = []
      usedDates = []
      if (this.unitSelector == 0 || this.unitSelector == null){
        this.unitSelector = 1;
      }
      else{
        this.unitSelector = 0;
      }
      for (let index = 0; index < this.entries.length; index++) {
      if(this.entries[index].trackerID == this.trackerID)
      {
        if(usedDates.includes(this.entries[index].date) == false && this.entries[index].value[this.unitSelector] != null){
          
          usedDates.push(this.entries[index].date)
          mydate = new Date(this.entries[index].date)
          mydate.setHours(0,0,0,0)
          mydate.setDate(mydate.getDate() + 1)
          this.entryData.push({value: this.entries[index].value[this.unitSelector], date: mydate})
          this.entryValues.push(this.entries[index].value[this.unitSelector])
          this.entryDates.push(mydate)
          this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
        }
      }}
    this.entryData.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});

      svg.selectAll('*').remove()
      svg.append('g')
        .attr('transform', 'translate(0, 10)')
      if(this.entryData.length >= 2){
    var x = d3.scaleTime().domain([new Date(Math.min.apply(null,this.entryDates)), new Date(Math.max.apply(null,this.entryDates))]).range([60, 340])
    var y = d3.scaleLinear().domain([0.95 * d3.min(this.entryValues), 1.05 * d3.max(this.entryValues)]).range([210, 0]).nice()
    var dateDifference = (new Date(Math.max.apply(null,this.entryDates)).getTime() - new Date(Math.min.apply(null,this.entryDates)).getTime())/(1000 * 3600 * 24)
    var createPath = d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.value) })
    if(dateDifference <= 20){
      bottomAxis = d3.axisBottom(x).ticks(3)
    }
    else{
      bottomAxis = d3.axisBottom(x).ticks(5)
    }
    var leftAxis = d3.axisLeft(y).ticks(5)
    svg.append('text').attr("x", -85).attr("y", 10).text(this.currentTracker.unit[this.unitSelector]).style("text-anchor", "middle").attr('transform', 'rotate(270)').style("font-size", "10pt")
    svg.append('text').attr("x", 180).attr("y", 240).text("Date").style("text-anchor", "middle").style("font-size", "10pt")
    svg.append('g').call(bottomAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(0,210)')
    svg.append('g').call(leftAxis)
      .attr("class", "axis")
      .attr('transform', 'translate(60,0)')
    svg.append('path').attr('d', createPath(this.entryData)).attr('id', 'dataPath')
    }
    else{
      svg.append('text').attr("x", 180).attr("y", 125).text("Please add at least two entries on").style("text-anchor", "middle")
      svg.append('text').attr("x", 180).attr("y", 145).text("different dates to see your progress!").style("text-anchor", "middle")
    }
    })
  },
  beforeDestroy(){
    EventBus.$off('switchUnits')
  }
}

</script>
<style>
svg {
  margin: 25px;
}
path{
  fill: none;
  stroke:black;
  stroke-width: 1.5px;
}
#dataPath{
  fill: none;
  stroke:#DF5C46;
  stroke-width: 2px;
}
.axis{
  font-size: 10px;
}

</style>
