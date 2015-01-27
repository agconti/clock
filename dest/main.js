var time = ['hours', 'minutes', 'seconds']
var svg = d3.select('.clock')
  .append('svg')
  .append('g')

svg.selectAll('rect')
  .data(time).enter()
  .append('rect')
    