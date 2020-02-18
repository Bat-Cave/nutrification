import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../dux/reducer';
import axios from 'axios';

const Dashboard = (props) => {

  const [history, setHistory] = useState([]);
  const [today, setToday] = useState([]);
  const [date, setDate] = useState('');
  const [containerClass, setContainerClass] = useState('container');
  const [recommended, setRecommended] = useState('');
  const [keyz, setKeys] = useState([]);

  const getMe = () => {
    axios.get('/api/me').then(res => {
      props.updateUser(res.data)
    }).catch(err => {
      console.log(err);
      props.history.push('/auth/login')
    })
  }

  let todaysHistory = history.filter(entry => entry.entry_date === date)

  let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  let keys = [];
  function getTodayStats(){
    for(let i = 0; i < todaysHistory.length; i++){
      for(let j = 6; j < Object.keys(todaysHistory[i]).length; j++){
        sum[j] = sum[j] + +todaysHistory[i][Object.keys(todaysHistory[i])[j]];
        keys.push(Object.keys(todaysHistory[i])[j])
        // console.log(todaysHistory[i][Object.keys(todaysHistory[i])[j]])
      }
    }
    keys.push('Protein', 'Fiber', 'Water', 'Carbohydrates', 'Sugar', 'Fat', 'Calories', 'Alcohol', 'Caffeine')
    console.log(keys)
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
    console.log(dateDefault)
    setDate(dateDefault)
  }
  
  useEffect(() => {
    getMe();
    getDate();
    axios.get(`/api/userHistory/${props.id}`).then(res => {
      console.log(res.data)
      setHistory(res.data.reverse());
      setContainerClass('container left');
    })
    axios.get('/api/recommended').then(res => {
      setRecommended(res.data);
    })
    setToday(todaysHistory);
    
  }, [])

  // useEffect(() => {
  //   setKeys(keys)    
  // })
  
  
  getTodayStats();

  let index;
  const todayStats = sum.map((e, i) => {
    index = i - 6;
    let rec = 0;
    let name;
    if(recommended[index]){
      rec = recommended[index].m_recommended
    }
    let unique = keyz.splice(36, keyz.length - 36);
    console.log(unique)
    let percent = e*100/rec
    if(index >= 0){
      return(
        <div className='stat-container'>
          <h4>{unique[index]}</h4>
          <div className='bar'><p className='consumed' style={{width: percent +'%'}}>{e}</p></div>
          <div className='bar'><p className='recommended'>{rec}</p></div>
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
    <div className={containerClass}>
      <h1>DASHBOARD</h1>
      <div className="dash-top">
        <div className='welcome-container'>
          <h2>Hello{props.first_name ? `, ${props.first_name}` : null}</h2>
        </div>
        <div className='recommendations'>
          <p>Based on your information, you need:</p>
          <ul>
            <li><span className='rec-span'>{props.rec_daily_water || '{Water}'}</span> cups of Water</li>
            <li><span className='rec-span'>{props.rec_daily_calorie || '{Calories}'}</span> Calories</li>
            <li><span className='rec-span'>{props.rec_daily_protein || '{Protein}'}</span> grams of Protein</li>
            <li><span className='rec-span'>{props.rec_daily_carb || '{Carbs}'}</span> grams of Carbohydrates</li>
            <li><span className='rec-span'>{props.rec_daily_fat || '{Fat}'}</span> grams of Fat</li>
          </ul>
        </div>
      </div>
      <div className='dash-middle'>
        {todayStats}
      </div>
      <div className='dash-bottom'>
        <div className='table-header'>
          {/* <div className='column s'><p></p></div> */}
          <div className='column'><p>Date</p></div>
          <div className='column'><p>Meal Name</p></div>
          <div className='column you-ate-column'><p>You Ate</p></div>
          <div className='column'><p>Water</p></div>
          <div className='column'><p>Calories</p></div>
          <div className='column'><p>Protein</p></div>
          <div className='column'><p>Fiber</p></div>
          <div className='column'><p>Carbs</p></div>
          <div className='column'><p>Sugar</p></div>
          <div className='column'><p>Fat</p></div>
          <div className='column v'><p>Biotin</p></div>
          <div className='column v'><p>Folic Acid</p></div>
          <div className='column v'><p>Niacin</p></div>
          <div className='column v'><p>Pantothenic Acid</p></div>
          <div className='column v'><p>Riboflavin</p></div>
          <div className='column v'><p>Thiamin</p></div>
          <div className='column v'><p>Vitamin A</p></div>
          <div className='column v'><p>Vitamin B6</p></div>
          <div className='column v'><p>Vitamin B12</p></div>
          <div className='column v'><p>Vitamin C</p></div>
          <div className='column v'><p>Vitamin D</p></div>
          <div className='column v'><p>Vitamin E</p></div>
          <div className='column v'><p>Vitamin K</p></div>
          <div className='column m'><p>Calcium</p></div>
          <div className='column m'><p>Chloride</p></div>
          <div className='column m'><p>Chromium</p></div>
          <div className='column m'><p>Copper</p></div>
          <div className='column m'><p>Iodine</p></div>
          <div className='column m'><p>Iron</p></div>
          <div className='column m'><p>Magnesium</p></div>
          <div className='column m'><p>Molybdenum</p></div>
          <div className='column m'><p>Phosphorus</p></div>
          <div className='column m'><p>Potassium</p></div>
          <div className='column m'><p>Selenium</p></div>
          <div className='column m'><p>Sodium</p></div>
          <div className='column m'><p>Zinc</p></div>
          {/* <div className='column s'><p></p></div> */}
        </div>
        <div className='table'>
          {mappedHistory}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updateUser})(Dashboard);