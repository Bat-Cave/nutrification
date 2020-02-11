import React from 'react';

const Dashboard = (props) => {
  return(
    <div className='container'>
      <div className="dash-top">
        <h2>Hello, {'{User}'}</h2>
      </div>
      <div className='dash-bottom'>
        <div className='table-header'>
          <div className='date'><p>Date</p></div>
          <div className='column'><p>Water</p></div>
          <div className='column'><p>Calories</p></div>
          <div className='column'><p>Protein</p></div>
          <div className='column'><p>Carbs</p></div>
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
          <div className='column'><p></p></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;