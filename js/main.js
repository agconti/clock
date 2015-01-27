var time = getTime()
  
  // svg config 
  , svgWidth = 700
  , svgHeight = 600
  margin = {
    top: 20
  , right: 30
  , bottom: 30
  , left: 40
  }

  // clock config
  , clock = '.clock'
  , blue = 'hsl(221, 85%, 22%)'
  , barPadding = 1
  , yScale = d3.scale.linear()
      .domain(d3.extent(time))
      .range([0, d3.max(time)])



function getTime () {
  var now = new Date()
  return [ now.getHours()
         , now.getMinutes()
         , now.getSeconds()
         ]

}

var svg = d3.select(clock)
  .append('svg')
  .append('g')


var rects = svg.selectAll('rect')
  .data(time).enter()
  .append('rect')
  .attr('x', function(data, i){ return i * 101 })
  .attr('y', 0)
  .attr('width', 100)
  .attr('height', function(data){ return yScale(data) })
  .attr('fill', blue)

function tick (time){

  var rects = svg.selectAll('rect')
    .attr('x', function(data, i){ return i * 101 })
    .attr('y', 0)
    .attr('width', 100)
    .attr('height', function(data){ return yScale(data) })
    .attr('fill', blue)
}

// The initial display.
tick(time)

// update the clock 
setInterval(function() {
  var time = getTime()
  yScale.domain(d3.extent(time))
  tick(time)
  console.log(time)
}, 1000)
    