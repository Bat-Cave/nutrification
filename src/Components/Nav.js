import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {updateContainerClass} from '../dux/reducer';
import {updateUser} from '../dux/userReducer';
import {connect} from 'react-redux';
import axios from 'axios';

class Nav extends Component{
  constructor(props){
    super(props)

    this.state = {
      navClass: 'nav-container',
      toggleIcon: 'nav-container-span'
    }
  }

  toggleNav = () => {
    if(this.state.navClass === 'nav-container'){
      this.props.updateContainerClass('container nav-closed-container')
      this.setState({navClass: 'nav-container move_left'})
      this.setState({toggleIcon: 'nav-container-span rotate'})
    } else {
      this.props.updateContainerClass('container')
      this.setState({navClass: 'nav-container'})
      this.setState({toggleIcon: 'nav-container-span'})
    }
  }

  getMe = () => {
    axios.get('/api/me').then(res => {
      console.log(res.data)
      this.props.updateUser(res.data)
    }).catch(err => {
      console.log(err);
      this.props.history.push('/auth/login')
    })
  }

  componentDidMount(){
    this.getMe();
  }

  logout(){
    axios.post('/api/auth/logout');
    setTimeout(() => {
      this.props.history.push('/auth/login')
    }, 1000)
    
  }

  render(){
    if(!this.props.location.pathname.includes("/auth")){
      return(
        <div className={this.state.navClass}>
          <span className={this.state.toggleIcon} onClick={() => this.toggleNav()}><i className="fas fa-angle-double-left"></i></span>
          <div className='nav-top'>
            <div className='profile_pic_container'>
              <img src={this.props.userReducer.profile_pic || 'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
            </div>
          <Link to='/'>Dashboard</Link>
          <Link to='/entry'>New Entry</Link>
          <Link to='/history'>History</Link>
          <Link to='/profile'>Profile</Link>
        </div>
        <div className='recommendations'>
          <table>
            <tbody>
              <tr>
                <th colSpan='2'>Recommended:</th>
              </tr>
              <tr>
                <td>Water:</td>
                <td>{this.props.userReducer.rec_daily_water || '{Water}'} cups</td>
              </tr>
              <tr>
                <td>Calories:</td>
                <td>{this.props.userReducer.rec_daily_calorie || '{Calories}'}</td>
              </tr>
              <tr>
                <td>Protein:</td>
                <td>{this.props.userReducer.rec_daily_protein || '{Protein}'} g</td>
              </tr>
              <tr>
                <td>Carbs:</td>
                <td>{this.props.userReducer.rec_daily_carb || '{Carbs}'} g</td>
              </tr>
              <tr>
                <td>Fat:</td>
                <td>{this.props.userReducer.rec_daily_fat || '{Fat}'} g</td>
              </tr>
            </tbody>
          </table>
        </div>
          <div className='nav-bottom'>
            <button id='logout-button' onClick={() => this.logout()}>Logout</button>
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


export default withRouter(connect(mapStateToProps, {updateUser, updateContainerClass})(Nav));