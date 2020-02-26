import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


const History = (props) => {
  
  const [history, setHistory] = useState([]);

  useEffect(()=> {
    axios.get(`/api/userHistory/${props.userReducer.id}`).then(res => {
      setHistory(res.data.reverse());
    })
  }, [])

  const deleteMeal = id => {
    setHistory([])
    axios.delete(`/api/meal/${id}`).then(res => {
      console.log(res);
    })
    axios.get(`/api/userHistory/${props.userReducer.id}`).then(res => {
      setHistory(res.data.reverse());
    })
  }


  const mappedHistory = history.map((e, i) => {
    let youAte = e.you_ate.split('|');
    youAte.shift();
    let joined = youAte.join(', ');
    return(
      <div className='table-row' key={i}>
            <div className='column th s'><p><button id='delete' onClick={() => deleteMeal(e.entry_id)}><i className="fas fa-trash-alt"></i></button></p></div>
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
    <div className={props.reducer.containerClass}>
      <h1>HISTORY</h1>
      <div className='dash-bottom'>
        <div className='table-header'>
          <div className='column s'><p><i className="fas fa-trash-alt"></i></p></div>
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
            {mappedHistory.length === 0 ? 
            <div className='history-loading'>
              <span className='loader'>
              <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="svg-inline--fa fa-carrot fa-w-16">
            <title>carrot</title>
            <g>
              <title>Layer 1</title>
              <g stroke="null" id="svg_1">
              <path stroke="null" id="carrot_1" d="m40.640582,21.222285c-7.183479,-3.522832 -15.607369,-1.43929 -20.473596,4.496066l7.524251,7.56655c0.858746,0.863574 0.858746,2.248033 0,3.097899c-0.422557,0.424933 -0.981424,0.644253 -1.540291,0.644253s-1.117733,-0.21932 -1.540291,-0.644253l-6.842707,-6.881174l-17.46117,36.009652c-0.395296,0.822451 -0.422557,1.8231 0,2.700381c0.736068,1.521534 2.576238,2.152081 4.089267,1.411875l18.210868,-8.937302l-6.706398,-6.744099c-0.858746,-0.849866 -0.858746,-2.248033 0,-3.097899c0.858746,-0.849866 2.235466,-0.849866 3.080581,0l7.769607,7.813286l13.903508,-6.826344c3.271413,-1.60378 6.065746,-4.290453 7.783238,-7.826993c4.102898,-8.457539 0.61339,-18.655933 -7.796869,-22.781896z" fill="currentColor"/>
              <path stroke="null" d="m0.125038,68.455349zm52.887852,-51.773299c2.658024,-5.57896 1.281304,-12.172277 -4.13016,-16.68205c-6.856337,5.716035 -7.156217,14.735583 -1.07684,20.821721l1.090471,1.096602c6.052115,6.113553 15.034871,5.811988 20.705321,-1.082894c-4.484563,-5.441885 -11.04102,-6.826344 -16.588793,-4.153378z" fill="currentColor" id="carrot_2"/>
              </g>
            </g>
            </svg>
              </span>
            </div>
            : mappedHistory}
          </div>
        </div>
    </div>
  )
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, null)(History);