import React from 'react';

const Profile = (props) => {
  return(
    <div className='container'>
      <h1>PROFILE</h1>
      <div className='prof-top'>
          <h2>{'{User_First}'}{'{User_Last}'}</h2>
          <img src={'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
      </div>
      <div className='prof-bottom'>
        <div className='profile-info'>
          <div className='profile-row'>
            <h4>Height</h4>
            <input type='text' />
          </div>
          <div className='profile-row'>
            <h4>Weight</h4>
            <input type='text' />
          </div>
          <div className='profile-row'>
            <h4>Gender</h4>
            <input type='text' />
          </div>
          <div className='profile-row'>
            <h4>Age</h4>
            <input type='text' />
          </div>
          <div className='profile-row'>
            <h4>Activity Level</h4>
            <input type='text' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;