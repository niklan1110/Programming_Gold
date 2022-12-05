// https://d3-graph-gallery.com/graph/line_cursor.html
/**
 * This part of the code sets the proper 
 * dimensions of the chart. In this specific case
 * values of 900 and 600 were chosen.
 * @param {width} width The width of the graph 
 * @param {height} height The height of the graph  
*/
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
/**
 * This part of the code adds the cvg element to the webpage by
 * selecting a div tag and its id in the hmtl file.
 * @my_dataviz div The name of div block where this chart will take place
 */
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

/**
 * This part of the code reads data from csv file.
 */
d3.csv("windows_data.csv", function(data) {

    /**
     * Generates groups
     * @Windows group This is a group in my dataset
     * @Macos group Another group of my dataset
     */
    var allGroup = ["Windows", "Macos"]

    /**
     * Reformats the data to get list of tuples {x, y}
     */
    var dataReady = allGroup.map( function(grpName) { 
      return {
        name: grpName,
        values: data.map(function(d) {
          return {time: d.time, value: +d[grpName]};
        })
      };
    });

  /** Color change  */
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    /** Append x-axis */
    var x = d3.scaleLinear()
      .domain([2000,2020])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
    /** Append y-axis */
    var y = d3.scaleLinear()
      .domain( [0,100])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    /** Chart lines are added */
    var line = d3.line()
      .x(function(d) { return x(+d.time) })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

    svg
      /** First we need to enter in a group */
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
        .attr("class", function(d){ return d.name })
      /**Now we enter their values  */
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

    /** Now we add the legend (name of the lines represented on the diagram) */
    svg
      .selectAll("myLegend")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr('x', function(d,i){ return 100 + i*300})
          .attr('y', 30)
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 20)
        .on("click", function(d){
          currentOpacity = d3.selectAll("." + d.name).style("opacity")
          d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)

        })
})
/** https://www.balbooa.com/blog/tips-and-tricks/add-falling-snowflakes-animation-on-your-joomla-site 
 * Module which I found on this website which allows me to add a bit of christmas mood to
 * this webpage.
*/
document.addEventListener('DOMContentLoaded', function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
  script.onload = function(){
      particlesJS("snow", {
          "particles": {
              "number": {
                  "value": 200,
                  "density": {
                      "enable": true,
                      "value_area": 800
                  }
              },
              "color": {
                  "value": "#ffffff"
              },
              "opacity": {
                  "value": 0.7,
                  "random": false,
                  "anim": {
                      "enable": false
                  }
              },
              "size": {
                  "value": 5,
                  "random": true,
                  "anim": {
                      "enable": false
                  }
              },
              "line_linked": {
                  "enable": false
              },
              "move": {
                  "enable": true,
                  "speed": 5,
                  "direction": "bottom",
                  "random": true,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                      "enable": true,
                      "rotateX": 300,
                      "rotateY": 1200
                  }
              }
          },
          "interactivity": {
              "events": {
                  "onhover": {
                      "enable": false
                  },
                  "onclick": {
                      "enable": false
                  },
                  "resize": false
              }
          },
          "retina_detect": true
      });
  }
  document.head.append(script);
});

