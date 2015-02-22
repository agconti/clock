;(function(){

var time = getTime()

  // svg config 
  , svgWidth = 900
  , svgHeight = 600

  // clock config
  , clock = '.clock'
  , frameRate = 500
  , blue = 'hsl(221, 85%, 22%)'
  , peach = 'hsl(31, 100%, 50%)'
  , orange = 'hsl(41, 100%, 50%)'
  , yellow = 'hsl(51, 100%, 50%)'
  , colorScale = d3.scale.ordinal()
      .domain(d3.range(3))
      .range([peach, orange, yellow])
  , maximumTime = [-1, 1]
  , radiusScale = d3.scale.linear()
      .domain(maximumTime)
  , hourScale = d3.scale.ordinal()
      .domain(d3.range(24))
  , horizonScale = d3.scale.ordinal()
      .domain(d3.range(24))

  // legend config
  , labels = [ { value: 'AM', textAnchor: "start"}
             , { value: 'PM', textAnchor: "end"}
             ]
  , legendMargin = 25
  , legendScale = d3.scale.ordinal()
      .domain(d3.range(labels.length))

/**
 * A factory that returns the current time.
 * @return {object} -- an array of the form [ miliseconds%, seconds%, minuets% ]
 */
function getTime () {
  var now = new Date()
  return [ now.getMilliseconds() / 999
         , now.getSeconds() / 60
         , now.getMinutes() / 60
         ]
}

/**
 * Sets the clocks scales to the current svg width and height
 */
function setScales(){
  d3.select('svg')
    .attr("height", svgHeight)
    .attr("width", svgWidth)
  radiusScale
    .range([0, (svgHeight / 2)])
  hourScale
    .rangeBands([-1, svgWidth])
  horizonScale
    .range([svgHeight, 0, svgHeight])
  legendScale
    .range([legendMargin, svgWidth - legendMargin])
}

/**
 * Sets the clocks legened
 */
function setLegend(){
  legend = svg.selectAll('text')
    .data(labels)
    .attr("x", function(d, i) { return legendScale(i) })
    .attr("y", svgHeight - legendMargin)
    .attr("dy", "0.75em")
    .attr("text-anchor", function(d) { return d.textAnchor })
    .style("fill", blue)
    .text(function(d) { return d.value })    
}

/**
 * Fully redraws the clock from scratch.
 */
function setSvgDimensions(){
    svgWidth = window.innerWidth 
    svgHeight = window.innerHeight
    setScales()
    setLegend()
    tick(getTime())
}


/**
 * Updates the clock as time passes. 
 */
function tick (time){

  hands = svg.selectAll('circle')
    .data(time)
    .transition()
    .duration(frameRate)
    .attr('cx', function(){ 
      var now = new Date()
      return hourScale(now.getHours())
    })
    .attr('cy', function(){
      var now = new Date()
      return horizonScale(now.getHours())
    })
    .attr("r", function(d){ return radiusScale(d) })
    .style('fill', function(d, i){ return colorScale(i) })
}

var svg = d3.select(clock)
  .append('svg')
  .append('g')

var hands = svg.selectAll('g')
  .data(time).enter()
  .append('g')

// append base cirlces, so we can update them
hands.append('circle')
     .style('fill', function(d, i){ return colorScale(i) })

var legend = svg.selectAll('text')
    .data(labels).enter()
    .append('text')

// The initial display.
setSvgDimensions()

// allow the clock resize responsively
window.onresize = setSvgDimensions

// update the clock 
setInterval(function() {
  var time = getTime()
  tick(time)
}, frameRate)

})()
    