import React, { Component } from 'react'
import * as d3 from 'd3'
class BarChart extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: [],
      labels: ["Biotin", "Folic Acid", "Niacin", "Pantothenic Acid", "Riboflavin", "Thiamin", "Vitamin A", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Chloride", "Chromium", "Copper", "Iodine", "Iron", "Magnesium", "Mangenese", "Molybdenum", "Phosphorus", "Potassium", "Selenium", "Sodium", "Zinc", "Protein", "Fiber", "Water", "Carbohydrates", "Sugar", "Fat", "Calories", "Alcohol", "Caffeine"]
    }
  }
    componentDidMount() {
        setTimeout(() => {
          this.setState({data: this.props.data})
          this.drawBarChart(this.state.data, this.state.labels)
        }, 5000)
        console.log(this.state.data);
    }
    drawBarChart(data, labels) {
      const canvasHeight = 400
      const canvasWidth = 600
      const topMargin = 20
      const scale = 10
      const svgCanvas = d3.select(".canvas")
          .append('svg')
          .attr('width', canvasWidth - 150)
          .attr('height', 1200)
          .style('border', '1px solid black')
      svgCanvas.selectAll('rect')
          .data(data).enter()
              .append('rect')
              .attr('width', (datapoint, i) => i % 2 === 0 ? (datapoint / datapoint) * scale : (data[i]/data[i+1]) * scale)
              .attr('height', 10)
              .attr('fill', 'orange')
              .attr('x', 1)
              .attr('y', (datapoint, iteration) => iteration * 15 + 1 + topMargin)
      svgCanvas.selectAll('text')
      .data(data).enter()
          .append('text')
          .attr('x', (datapoint, i) => i % 2 === 0 ? (datapoint / datapoint) * scale : (data[i]/data[i+1]) * scale)
          .attr('y', (dataPoint, i) => i * 15 + 11 + topMargin)
          .text(dataPoint => dataPoint)

      const alternateColor = i => {
        if (i % 2 === 0){
          return 'orange'
        } else {
          return 'green'
        }
      }
      const svgLabel = d3.select(this.refs.label)
          .append('svg')
          .attr('width', 150)
          .attr('height', 1200)
          .style('border', '1px solid black')
      svgLabel.selectAll('text')
      .data(labels).enter()
          .append('text')
          .attr('x', 15)
          .attr('y', (dataPoint, i) => i * 30 + 15 + topMargin)
          .text((dataPoint, i) => labels[i])
      }
    render() {
      console.log(this.props.data)
      return(
        <div className='chart-container'>
          <div ref="label"></div> 
          <div className='canvas' ref="canvas"></div> 
        </div>
      )
    }
}
export default BarChart