import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {updateMealHistory} from '../dux/reducer';
import {updateUser} from '../dux/userReducer';
import axios from 'axios';
import BarChart from './BarChart';
import {Bar} from 'react-chartjs-2';

const Dashboard = (props) => {

  const [history, setHistory] = useState([]);
  const [graphClass, setGraphClass] = useState('chart-toggle');
  const [chartClass, setChartClass] = useState('chart-js');
  const [cardClass, setCardClass] = useState('stat-container');
  const [graphButton, setGraphButton] = useState('graphButton');
  const [chartButton, setChartButton] = useState('');
  const [cardButton, setCardButton] = useState('');
  const [yyyymmdd, setyyyymmdd] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [recommended, setRecommended] = useState('');
  const keys = ["Biotin", "Folic Acid", "Niacin", "Pantothenic Acid", "Riboflavin", "Thiamin", "Vitamin A", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Chloride", "Chromium", "Copper", "Iodine", "Iron", "Magnesium", "Mangenese", "Molybdenum", "Phosphorus", "Potassium", "Selenium", "Sodium", "Zinc", "Protein", "Fiber", "Water", "Carbohydrates", "Sugar", "Fat", "Calories", "Alcohol", "Caffeine"];
  const units = ['mcg', 'mcg','mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'IU', 'IU', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'IU', 'IU', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'mcg', 'mcg', 'mg', 'mg', 'mg', 'mg', 'g', 'g', 'g', 'g', 'cups', 'cups', 'g', 'g', 'g', 'g', 'g', 'g', 'calories', 'calories', 'g', 'g', 'g', 'g']
  const loginClass = 'svg';
  

  const getMe = () => {
    axios.get('/api/me').then(res => {
      props.updateUser(res.data)
    }).catch(err => {
      console.log(err);
      props.history.push('/auth/login')
    })
  }

  const toggleGraph = () => {
    if(graphClass === 'chart-toggle'){
      setGraphClass('chart-toggle none')
      setGraphButton('opacity20')
    } else {
      setGraphClass('chart-toggle')
      setGraphButton('graphButton')
    }
  }

  const toggleCards = () => {
    if(cardClass === 'stat-container'){
      setCardClass('stat-container none')
      setCardButton('opacity20')
    } else {
      setCardClass('stat-container')
      setCardButton('')
    }
  }

  const toggleChart = () => {
    if(chartClass === 'chart-js'){
      setChartClass('chart-js none')
      setChartButton('opacity20')
    } else {
      setChartClass('chart-js')
      setChartButton('')
    }
  }

  let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  if(history){
    let todaysHistory = history.filter(entry => entry.entry_date === date)
    for(let i = 0; i < todaysHistory.length; i++){
      for(let j = 6; j < Object.keys(todaysHistory[i]).length; j++){
        sum[j] = sum[j] + +todaysHistory[i][Object.keys(todaysHistory[i])[j]];
        // console.log(todaysHistory[i][Object.keys(todaysHistory[i])[j]])
      }
    }

  }

  const getDate = () => {
    const d = new Date();
    const m = d.getMonth() + +1;
    const month = () => {
      if(m.toString.length < 2){
        return `0${d.getMonth()+ +1}`
      } else {
        return `${d.getMonth()+ +1}`
      }
    }
    setyyyymmdd(`${d.getFullYear()}-${month()}-${d.getDate()}`)
    const dateDefault = `${month()}/${d.getDate()}/${d.getFullYear()}`
    setDate(dateDefault)

    console.log(`Got today's date: ${dateDefault}.`)
  }
  
  const setSelectionDate = (val) => {
    setyyyymmdd(val)
    let split = val.split('-')
    let sdate = `${split[1]}/${split[2]}/${split[0]}`
    
    setDate(sdate)
    setData(d3data)
    console.log(`Set date to ${sdate}.`)
  }

  let index;
  let d3data = []
  const todayStats = sum.map((e, i) => {
    // console.log(`Mapping through sum[${i}]: ${e}.`)
    index = i - 6;
    d3data.push(+e.toFixed(2))
    let rec = 0;
    let unit = '';
    if(recommended[index]){
      rec = recommended[index].m_recommended
      unit = recommended[index].m_units
    } else {
      rec = 1; 
    }
    
    d3data.push(+rec)

    let percent = e*100/rec
    if(e > rec){
      percent = 100;
    }
    if(index >= 0){
      return(
        <div key={i} className={cardClass}>
          <h4>{keys[index]}</h4>
          <div className='bar'><p className='consumed' style={{width: percent +'%'}}><span className='p-span'>{`${e.toFixed(2)} ${unit}`}</span></p></div>
          <div className='bar'><p className='recommended'>{rec} {unit}</p></div>
        </div>
      )
    } else {
      return null;
    }
  })
  const d = d3data.splice(12, d3data.length - 12)
 
  useEffect(() => {
    getMe();
    getDate();
    axios.get(`/api/userHistory/${props.userReducer.id}`).then(res => {
      setHistory(res.data.reverse());
      props.updateMealHistory(res.data.reverse())
    })
    axios.get('/api/recommended').then(res => {
      let rec = res.data;
      let fiber = 30
      if(props.userReducer.gender === 'female'){
        fiber = 25
      }
      rec.push(
        {m_recommended: props.userReducer.rec_daily_protein, m_units: 'g'}, 
        {m_recommended: fiber, m_units: 'g'},
        {m_recommended: props.userReducer.rec_daily_water, m_units: 'cups'},
        {m_recommended: props.userReducer.rec_daily_carb, m_units: 'g'},
        {m_recommended: 0, m_units: 'g'},
        {m_recommended: props.userReducer.rec_daily_fat, m_units: 'g'},
        {m_recommended: props.userReducer.rec_daily_calorie, m_units: 'calories'},
        {m_recommended: 0, m_units: 'g'},
        {m_recommended: 0, m_units: 'g'})
      setRecommended(rec);
    })
    setData(d3data.splice(12, d3data.length - 12));
  }, [])

  let chartData = []
  const chartJSData = () => {
    for(let i = 0; i < d.length; i = i + 2){
      if(+d[i] > +d[i+1]){
        chartData.push(100)
      }
      chartData.push(Math.round((+d[i]/+d[i+1])*100))
    }
  }
  
  chartJSData();

  const state = {
    labels: keys,
    datasets: [
      {
        label: "Nutrition",
        backgroundColor: 'rgb(256,165,0)',
        data: chartData
      }
    ]
  }

  return(
    <div className={props.reducer.containerClass}>
      <h1>DASHBOARD</h1>
      <div className="dash-top">
        <div className='welcome-container'>
          <h2>Hello{props.userReducer.first_name ? `, ${props.userReducer.first_name}.` : null}</h2>
          <button className={graphButton} onClick={() => toggleGraph()}>Nutrition Bar Graph</button>
          <button className={chartButton} onClick={() => toggleChart()}>Nutrition Chart</button>
          <button className={cardButton} onClick={() => toggleCards()}>Nutrition Cards</button>
        </div>
      </div>
      <div className='dash-middle'>
        <div className='select-day-nutrition'>
          <h3>Today's Nutrition</h3>
          <input type='date' value={yyyymmdd} onChange={(e) => setSelectionDate(e.target.value)}/>
          {/* <button>Get Nutrition</button> */}
          <div className='graph-key'>
            <p className='green-key'></p><p> - Recommended</p>
            <p className='orange-key'></p><p> - Eaten</p>
          </div>
        </div>
        <div className='today-stats'>
          <div className={graphClass}>
            <BarChart data={d} />
          </div>
          <div className={chartClass}>
            <Bar
                data={state}
                options={{
                  padding:"0px",
                  responsive: true,
                  maintainAspectRatio:true,
                  defaultFontSize:"12px",
                  width:"400",
                  height:"400",
                  legend:{
                    display:false,
                    position:'right'
                  },
                  title: {
                      display: true,
                      text: '% of Nutrition'
                  }
                }}
              />
          </div>
          {todayStats}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updateUser, updateMealHistory})(Dashboard);