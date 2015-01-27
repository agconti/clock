var now = new Date()
  , time = [ now.getHours()
           , now.getMinutes()
           , now.getSeconds()
           ]

var svg = d3.select('.clock')
  .append('svg')
  .append('g')

var rects = svg.selectAll('rect')
  .data(time).enter()
  .append('rect')
  .attr('x', function(data, i){ return i * 101})
  .attr('y', 0)
  .attr('width', 100)
  .attr('height', function(data){ return data})


    