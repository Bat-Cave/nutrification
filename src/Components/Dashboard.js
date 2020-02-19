import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {updateUser, updateMealHistory} from '../dux/reducer';
import axios from 'axios';

const Dashboard = (props) => {

  const [history, setHistory] = useState([]);
  const [today, setToday] = useState([]);
  const [date, setDate] = useState('');
  const [recommended, setRecommended] = useState('');
  const [keys, setKeys] = useState(["Biotin", "Folic Acid", "Niacin", "Pantothenic Acid", "Riboflavin", "Thiamin", "Vitamin A", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K", "Calcium", "Chloride", "Chromium", "Copper", "Iodine", "Iron", "Magnesium", "Mangenese", "Molybdenum", "Phosphorus", "Potassium", "Selenium", "Sodium", "Zinc", "Protein", "Fiber", "Water", "Carbohydrates", "Sugar", "Fat", "Calories", "Alcohol", "Caffeine"]);

  const getMe = () => {
    axios.get('/api/me').then(res => {
      props.updateUser(res.data)
    }).catch(err => {
      console.log(err);
      props.history.push('/auth/login')
    })
  }

  let todaysHistory = history.filter(entry => entry.entry_date === date)

  let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  function getTodayStats(){
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
    const dateDefault = `${month()}/${d.getDate()}/${d.getFullYear()}`
    setDate(dateDefault)
  }
  
  useEffect(() => {
    getMe();
    getDate();
    axios.get(`/api/userHistory/${props.id}`).then(res => {
      setHistory(res.data.reverse());
      props.updateMealHistory(res.data.reverse())
    })
    axios.get('/api/recommended').then(res => {
      let rec = res.data;
      let fiber = 30
      if(props.gender === 'female'){
        fiber = 25
      }
      rec.push(
        {m_recommended: props.rec_daily_protein, m_units: 'g'}, 
        {m_recommended: fiber, m_units: 'g'},
        {m_recommended: props.rec_daily_water, m_units: 'cups'},
        {m_recommended: props.rec_daily_carb, m_units: 'g'},
        {m_recommended: 0, m_units: 'g'},
        {m_recommended: props.rec_daily_fat, m_units: 'g'},
        {m_recommended: props.rec_daily_calorie, m_units: 'calories'},
        {m_recommended: 0, m_units: 'g'},
        {m_recommended: 0, m_units: 'g'})
      setRecommended(rec);
    })
    setToday(todaysHistory);
    
  }, [])


  
  getTodayStats();

  let index;
  const todayStats = sum.map((e, i) => {
    index = i - 6;
    let rec = 0;
    let unit = '';
    if(recommended[index]){
      rec = recommended[index].m_recommended
      unit = recommended[index].m_units
    }
    let percent = e*100/rec
    if(index >= 0){
      return(
        <div key={i} className='stat-container'>
          <h4>{keys[index]}</h4>
          <div className='bar'><p className='consumed' style={{width: percent +'%'}}><span className='p-span'>{`${e.toFixed(2)} ${unit}`}</span></p></div>
          <div className='bar'><p className='recommended'>{rec} {unit}</p></div>
        </div>
      )
    } else {
      return null;
    }
  })

  const mappedHistory = history.map((e, i) => {
    let youAte = e.you_ate.split('|');
    youAte.shift();
    let joined = youAte.join(', ');
    return(
      <div className='table-row' key={i}>
            {/* <div className='column s'><p></p></div> */}
            <div className='column th'><p>{e.entry_date} - {e.entry_time}</p></div>
            <div className='column th'><p>{e.meal_name}</p></div>
            <div className='column you-ate'><p>{joined}</p></div>
            <div className='column th'><p>{parseFloat(e.water).toFixed(2)} cups</p></div>
            <div className='column th'><p>{parseFloat(e.calories).toFixed(2)}</p></div>
            <div className='column th'><p>{parseFloat(e.protein).toFixed(2)} g</p></div>
            <div className='column th'><p>{parseFloat(e.fiber).toFixed(2)} g</p></div>
            <div className='column th'><p>{parseFloat(e.carbohydrates).toFixed(2)} g</p></div>
            <div className='column th'><p>{parseFloat(e.sugar).toFixed(2)} g</p></div>
            <div className='column th'><p>{parseFloat(e.fat).toFixed(2)} g</p></div>
            <div className='column th'><p>{parseFloat(e.biotin).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.folate_folic_acid).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.niacin).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.pantothenic_acid).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.riboflavin).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.thiamin).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_a).toFixed(2)} IU</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_b6).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_b12).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_c).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_d).toFixed(2)} IU</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_e).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.vitamin_k).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.calcium).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.chloride).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.chromium).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.copper).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.iodine).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.iron).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.magnesium).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.molybdenum).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.phosphorus).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.potassium).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.selenium).toFixed(2)} mcg</p></div>
            <div className='column th'><p>{parseFloat(e.sodium).toFixed(2)} mg</p></div>
            <div className='column th'><p>{parseFloat(e.zinc).toFixed(2)} mg</p></div>
            {/* <div className='column s'><p></p></div> */}
          </div>
    )
  })


  return(
    <div className={props.containerClass}>
      <h1>DASHBOARD</h1>
      <div className="dash-top">
        <div className='welcome-container'>
          <h2>Hello{props.first_name ? `, ${props.first_name}.` : null}</h2>
        </div>
      </div>
      <div className='dash-middle'>
        <h3>Today's Nutrition</h3>
        <div className='today-stats'>
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