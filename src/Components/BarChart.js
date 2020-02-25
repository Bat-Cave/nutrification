import React, { Component } from 'react'
import * as d3 from 'd3'
class BarChart extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: [],
      labels: ["Biotin", "Folic Acid", "Niacin", "Pantothenic Acid", "Riboflavin", "Thiamin", "Vitamin A", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Chloride", "Chromium", "Copper", "Iodine", "Iron", "Magnesium", "Mangenese", "Molybdenum", "Phosphorus", "Potassium", "Selenium", "Sodium", "Zinc", "Protein", "Fiber", "Water", "Carbohydrates", "Sugar", "Fat", "Calories", "Alcohol", "Caffeine"],
      units: ['mcg', 'mcg','mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'IU', 'IU', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'IU', 'IU', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'g', 'g', 'g', 'g', 'cups', 'cups', 'g', 'g', 'g', 'g', 'g', 'g', 'calories', 'calories', 'g', 'g', 'g', 'g'],
      loginClass: 'svg'
    }
  }
    componentDidMount() {
        setTimeout(() => {
          this.setState({data: this.props.data})
          this.drawBarChart(this.props.data, this.state.labels)
        }, 3000)
      }
      
    componentDidUpdate(prevProps){
      if(this.props !== prevProps){
        this.setState({loginClass: 'svg loading'})
        d3.select(".canvas").selectAll("svg").remove()
        d3.select(".label").selectAll("svg").remove()
        this.setState({loginClass: 'svg none'})
        this.drawBarChart(this.props.data, this.state.labels)
      }
      setTimeout(() => {
        d3.select(".canvas").selectAll("svg").remove()
        d3.select(".label").selectAll("svg").remove()
        this.drawBarChart(this.props.data, this.state.labels)
      }, 3000)
    }

  

    drawBarChart(data, labels) {
      const canvasHeight = 1350
      const canvasWidth = window.innerWidth - (window.innerWidth * .35) - 208
      const topMargin = 0
      const scale = canvasWidth * .4
      const offset = 18
      const svgCanvas = d3.select(".canvas")
          .append('svg') 
          .attr('width', canvasWidth - 150)
          .attr('height', canvasHeight)
      svgCanvas.selectAll('rect')
          .data(data).enter()
              .append('rect')
              .attr('width', (datapoint, i) => {
                if(datapoint === 0){
                  return 10
                }
                if((i + 1) % 2 === 0){
                  return (datapoint/datapoint) * scale + 10
                } else {
                  if(data[i] > data[i+1]){
                    return scale + 10
                  } else {
                    return (data[i]/data[i+1]) * scale + 10
                  }
                }
              })
              .attr('height', 10)
              .attr('fill', 'orange')
              .attr('x', 1)
              .attr('y', (datapoint, iteration) => {
                if((iteration + 1) % 2 === 0){
                  return iteration * offset + 14 + topMargin
                } else {
                  return iteration * offset + 21 + topMargin
                }
              })
              .on('mouseover', function (d, i) {
                d3.select(this).transition()
                     .duration('50')
                     .attr('opacity', '.85');
              })
              .on('mouseout', function (d, i) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '1');
              });
      svgCanvas.selectAll('text')
      .data(data).enter()
          .append('text')
          .attr('x', (datapoint, i) => {
            if(datapoint === 0){
              return 15
            }
            if((i + 1) % 2 === 0){
              return (datapoint/datapoint) * scale + 15
            } else {
              if(data[i] > data[i+1]){
                return scale + 15
              } else {
                return (data[i]/data[i+1]) * scale + 15
              }
            }
          })
          .attr('y', (dataPoint, iteration) => {
            if((iteration + 1) % 2 === 0){
              return iteration * offset + 26 + topMargin
            } else {
              return iteration * offset + 26 + topMargin
            }
          })
          .text((dataPoint, i) => `${dataPoint} ${this.state.units[i]}`)

          svgCanvas.selectAll("rect")
          .transition()
          .duration(500)
          .attr("y", function(d, iteration) {
            if((iteration + 1) % 2 === 0){
              return iteration * offset + 14 + topMargin
            } else {
              return iteration * offset + 21 + topMargin
            }
          })
          .attr("width", function(datapoint, i) {
            if(datapoint === 0){
              return 10
            }
            if((i + 1) % 2 === 0){
              return (datapoint/datapoint) * scale + 10
            } else {
              if(data[i] > data[i+1]){
                return scale + 10
              } else {
                return (data[i]/data[i+1]) * scale + 10
              }
            }
          })
          .delay(function(d,i){ return(i*100)})

      const svgLabel = d3.select(this.refs.label)
          .append('svg')
          .attr('width', 150)
          .attr('height', canvasHeight)
      svgLabel.selectAll('text')
      .data(labels).enter()
          .append('text')
          .attr('x', 15)
          .attr('y', (dataPoint, iteration) => iteration * offset*2 + 36 + topMargin)
          .text((dataPoint, i) => `${labels[i]}`)

        
      svgLabel.exit().remove()
      svgCanvas.exit().remove()
    }

    
    render() {
      return(
        <div className='chart-container'>
        <div className='logo'>
            <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className={this.state.loginClass}>
            <title>carrot</title>
            <g>
              <title>Layer 1</title>
              <g stroke="null" id="svg_1">
              <path stroke="null" id="carrot_1" d="m40.640582,21.222285c-7.183479,-3.522832 -15.607369,-1.43929 -20.473596,4.496066l7.524251,7.56655c0.858746,0.863574 0.858746,2.248033 0,3.097899c-0.422557,0.424933 -0.981424,0.644253 -1.540291,0.644253s-1.117733,-0.21932 -1.540291,-0.644253l-6.842707,-6.881174l-17.46117,36.009652c-0.395296,0.822451 -0.422557,1.8231 0,2.700381c0.736068,1.521534 2.576238,2.152081 4.089267,1.411875l18.210868,-8.937302l-6.706398,-6.744099c-0.858746,-0.849866 -0.858746,-2.248033 0,-3.097899c0.858746,-0.849866 2.235466,-0.849866 3.080581,0l7.769607,7.813286l13.903508,-6.826344c3.271413,-1.60378 6.065746,-4.290453 7.783238,-7.826993c4.102898,-8.457539 0.61339,-18.655933 -7.796869,-22.781896z" fill="currentColor"/>
              <path stroke="null" d="m0.125038,68.455349zm52.887852,-51.773299c2.658024,-5.57896 1.281304,-12.172277 -4.13016,-16.68205c-6.856337,5.716035 -7.156217,14.735583 -1.07684,20.821721l1.090471,1.096602c6.052115,6.113553 15.034871,5.811988 20.705321,-1.082894c-4.484563,-5.441885 -11.04102,-6.826344 -16.588793,-4.153378z" fill="currentColor" id="carrot_2"/>
              </g>
            </g>
            </svg>
          </div>
        <div className='chart'>
          <div className='label' ref="label"></div> 
          <div className='canvas' ref="canvas"></div> 
        </div>
      </div>
      )
    }
}
export default BarChart