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

  // clock config
  , clock = '.clock'
  , blue = 'hsl(221, 85%, 22%)'
  , barPadding = 0.2
  , width = (svgWidth / time.length)
  , maximumTime = [0, 60]
  , yScale = d3.scale.linear()
      .domain(maximumTime)
      .range([svgHeight, 0])
  , xScale = d3.scale.ordinal()
    .domain(time.map(function(d, i){return i}))
    .rangeBands([0, svgWidth], barPadding)



function getTime () {
  var now = new Date()
  return [ now.getHours()
         , now.getMinutes()
         , now.getSeconds()
         ]

}

var svg = d3.select(clock)
  .append('svg')
  .attr('height', svgHeight + margin.top + margin.bottom + 'px')
  .attr('width', svgWidth + margin.left + margin.right + 'px')
  .style('margin-left', -margin.left+'px')
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


var rects = svg.selectAll('rect')
  .data(time).enter()
  .append('rect')
 
function tick (time){

  rects = svg.selectAll('rect')
    .data(time)
    .attr('x', function(d, i){ return xScale(i) })
    .attr('y', function(d){ return yScale(d) })
    .attr('width',  xScale.rangeBand())
    .attr('height', function(d){ return svgHeight - yScale(d) })
    .attr('fill', blue)
}

// The initial display.
tick(time)

// update the clock 
setInterval(function() {
  var time = getTime()
  tick(time)
  console.log(time)
}, 1000)
    