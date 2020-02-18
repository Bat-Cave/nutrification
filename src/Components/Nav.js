import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {updateUser} from '../dux/reducer';
import {connect} from 'react-redux';
import axios from 'axios';

class Nav extends Component{
  
  getMe = () => {
    console.log('Hit getMe()');
    axios.get('/api/me').then(res => {
      this.props.updateUser(res.data)
      console.log(res.data);
    }).catch(err => {
      console.log(err);
      this.props.history.push('/auth/login')
    })
  }

  componentDidMount(){
    this.getMe();
  }

  render(){
    if(!this.props.location.pathname.includes("/auth")){
      return(
        <div className='nav-container'>
          <div className='nav-top'>
            <div className='profile_pic_container'>
              <img src={this.props.profile_pic || 'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
            </div>
          <Link to='/'>Dashboard</Link>
          <Link to='/entry'>New Entry</Link>
          <Link to='/history'>History</Link>
          <Link to='/profile'>Profile</Link>
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
}

function mapStateToProps(state) {
  return state;
}


export default withRouter(connect(mapStateToProps, {updateUser})(Nav));