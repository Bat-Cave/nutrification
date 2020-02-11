import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Nav = (props) => {
  if(!props.location.pathname.includes("/auth")){
    return(
      <div className='nav-container'>
        <div className='nav-top'>
          <div className='profile_pic_container'>
            <img src={'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
          </div>
        <Link to='/'>Dashboard</Link>
        <Link to='/entry'>New Entry</Link>
        <Link to='/history'>History</Link>
        <Link to='/profile'>Profile</Link>
        {/* <p>Dashboard</p>
        <p>History</p>
        <p>Profile</p> */}
      </div>

        <div className='nav-bottom'>
          Logout
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default withRouter(Nav);