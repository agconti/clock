
var time = getTime()
  
  // svg config 
  , svgWidth = 250
  , svgHeight = 200
  , margin = {
      top: 20
    , right: 30
    , bottom: 30
    , left: 40
    }
  , frameRate = 200

  // clock config
  , clock = '.clock'
  , blue = 'hsl(221, 85%, 22%)'
  , labels = ['H', 'M', 'S']
  , barPadding = 0.2
  , maximumTime = [0, 1]
  , yScale = d3.scale.linear()
      .domain(maximumTime)
      .range([svgHeight, -1])
  , xScale = d3.scale.ordinal()
    .domain(time.map(function(d, i){return i}))
    .rangeBands([0, svgWidth], barPadding)


/**
 * A factory that returns the current time in a convenient array.
 * @return {object} -- an array of the form [ hours%, minutes%, seconds% ]
 */
function getTime () {
  var now = new Date()
  return [ now.getHours() / 24
         , now.getMinutes() / 60
         , now.getSeconds() / 60 
         ]
}

var svg = d3.select(clock)
  .append('svg')
  .attr('height', svgHeight + margin.top + margin.bottom + 'px')
  .attr('width', svgWidth + margin.left + margin.right + 'px')
  .style('margin-left', -margin.left+'px')
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var hands = svg.selectAll('g')
  .data(time).enter()
  .append('g')

hands.append('rect')
  .style('fill', blue)

hands.append("text")
  .attr("x", function(d, i) { return xScale(i) + (xScale.rangeBand() / 2) })
  .attr("y", 215)
  .attr("dy", "0.75em")
  .attr("text-anchor", 'middle')
  .attr("fill", blue)
  .text(function(d, i) { return labels[i] })   


/**
 * Updates the clock as time passes. 
 */
function tick (time){

  hands = svg.selectAll('rect')
    .data(time)
    .transition()
    .attr('x', function(d, i){ return xScale(i) })
    .attr('y', function(d){ return yScale(d) })
    .attr('width',  xScale.rangeBand())
    .attr('height', function(d){ return svgHeight - yScale(d) })
    .style('fill', blue)
}

// The initial display.
tick(time)

// update the clock 
setInterval(function() {
  var time = getTime()
  tick(time)
}, frameRate)
    