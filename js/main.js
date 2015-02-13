var time = getTime()
  
  // svg config 
  , svgWidth = 900
  , svgHeight = 600
  , margin = {
      top: 20
    , right: 30
    , bottom: 30
    , left: 40
    }

  // clock config
  , clock = '.clock'
  , blue = 'hsl(221, 85%, 22%)'
  , labels = ['M', 'S', 'M']
  , width = (svgWidth / time.length)
  , maximumTime = [-1, 1]
  , radiusScale = d3.scale.linear()
      .domain(maximumTime)
      .range([1, svgHeight / 2])
  , hourScale = d3.scale.ordinal()
    .domain(d3.range(24))
    .rangeBands([0, svgWidth])
  , horizonScale = d3.scale.ordinal()
    .domain(d3.range(24))
    .rangeBands([0, svgHeight])



function getTime () {
  var now = new Date()
  return [ now.getMinutes() / 60
         , now.getSeconds() / 60
         , now.getMilliseconds() / 1000
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
      return hourScale(now.getHours())
    })
    .attr("r", function(d){ return radiusScale(d) })
    .style('fill', function(d, i){ return ['red', 'yellow', 'blue'][i] })
    .style('opacity', 0.45)
}

// The initial display.
tick(time)

// update the clock 
setInterval(function() {
  var time = getTime()
  tick(time)
}, 4)
    