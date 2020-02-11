import React from 'react';

const Entry = (props) => {
  return(
    <div className='container'>
      <h1>NEW ENTRY</h1>
      <div className='entry-top'>
        <input type='date' />
        <div className='search-container'>
          <input type='search' placeholder='Search for food...'/>
          <div className='search-results'>

          </div>
        </div>
      </div>
      <div className='entry-bottom'>
        <h3>Recent</h3>
        <div className='recent-header'>
          <div className='column r'>Add</div>
          <div className='column r'>Date</div>
          <div className='column r'>Food</div>
          <div className='column r'>Brand</div>
        </div>
      </div>
    </div>
  )
}

export default Entry;