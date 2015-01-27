var time = ['hours', 'minutes', 'seconds']
var svg = d3.select('.clock')
  .append('svg')
  .append('g')

svg.selectAll('rect')
  .data(time).enter()
  .append('rect')
  .attr('x', function(data, i){ return i * 101})
  .attr('y', 0)
  .attr('width', 100)
  .attr('height', function(){ return  400 * Math.pow(Math.random(), 2) })


    