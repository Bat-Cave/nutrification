import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


const History = (props) => {
  
  const [history, setHistory] = useState([]);

  useEffect(()=> {
    axios.get(`/api/userHistory/${props.id}`).then(res => {
      setHistory(res.data.reverse());
    })
  }, [])


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
      <h1>HISTORY</h1>
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

export default connect(mapStateToProps, null)(History);