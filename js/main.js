var time = getTime()
  
  // svg config 
  , svgWidth = 900
  , svgHeight = 600

  // clock config
  , clock = '.clock'
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

function getTime () {
  var now = new Date()
  return [ now.getMinutes() / 60
         , now.getSeconds() / 60
         , now.getMilliseconds() / 1000
         ]
}


function setScales(){
  d3.select('svg')
    .attr("height", svgHeight)
    .attr("width", svgWidth)
  radiusScale
    .range([0, svgHeight * 0.25])
  hourScale
    .rangeBands([-1, svgWidth])
  horizonScale
    .rangeBands([svgHeight, 0])
  legendScale
    .range([legendMargin, svgWidth - legendMargin])
}

var svg = d3.select(clock)
  .append('svg')
  .append('g')

var legend = svg.selectAll('text')
    .data(labels).enter()
    .append('text')

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

var hands = svg.selectAll('g')
  .data(time).enter()
  .append('g')

// append base cirlces, so we can update them
hands.append('circle')


function tick (time){

  hands = svg.selectAll('circle')
    .data(time)
    .transition()
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


// update the clock 
setInterval(function() {
  var time = getTime()
  tick(time)
}, 4)


// The initial display.
function setSvgDimensions(){
    svgWidth = window.innerWidth 
    svgHeight = window.innerHeight
    setScales()
    setLegend()
    tick(getTime())
}
setSvgDimensions()

// responsively resize 
window.onresize = setSvgDimensions

    