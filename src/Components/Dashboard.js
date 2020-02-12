import React from 'react';

const Dashboard = (props) => {
  return(
    <div className='container'>
      <h1>DASHBOARD</h1>
      <div className="dash-top">
        <div className='welcome-container'>
          <h2>Hello, {'{User}'}</h2>
        </div>
        <div className='recommendations'>
          <p>Based on your information, you need:</p>
          <ul>
            <li><span className='rec-span'>{'{Water}'}</span> cups of Water</li>
            <li><span className='rec-span'>{'{Calories}'}</span> Calories</li>
            <li><span className='rec-span'>{'{Protein}'}</span> grams of Protein</li>
            <li><span className='rec-span'>{'{Carbs}'}</span> grams of Carbohydrates</li>
            <li><span className='rec-span'>{'{Fat}'}</span> grams of Fat</li>
          </ul>
        </div>
      </div>
      <div className='dash-bottom'>
        <div className='table-header'>
          <div className='column s'><p></p></div>
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
          <div className='column s'><p></p></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;