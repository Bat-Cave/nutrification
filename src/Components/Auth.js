import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {updateUser} from '../dux/reducer'

class Auth extends Component {
  constructor(props){
    super(props);

    this.state = {
      class: 'register-big',
      errorClass: 'error hidden',
      first_name: '',
      last_name: '',
      email: '',
      password:'',
      cpassword: '',
      activity_level: '',
      height: '',
      weight: '',
      age: '',
      gender: '',
      rec_daily_calorie: 0,
      rec_daily_protein: 0,
      rec_daily_carb: 0,
      rec_daily_fat: 0,
      rec_daily_water: 0

    }
  }

  handleInput = (name, val) => {
    this.setState({[name]: val})
  }

  registerUser = async () => {
    await this.calculateCalorieIntake();
    await this.calculateProteinIntake();
    await this.calculateCarbIntake();
    await this.calculateFatIntake();
    await this.calculateWaterIntake();
    
    const {first_name, last_name, email, password, activity_level, height, weight, age, gender, rec_daily_calorie, rec_daily_protein, rec_daily_carb, rec_daily_fat, rec_daily_water} = this.state;

    axios.post('/api/register', {first_name, last_name, email, password, height, weight, age, activity_level, gender, rec_daily_calorie, rec_daily_protein, rec_daily_carb, rec_daily_fat, rec_daily_water}).then(res => {
      this.props.updateUser(res.data);
    }).catch(err => {
      console.log(err);
    })
    console.log(`Calorie Intake: ${this.state.rec_daily_calorie}`)
    console.log(`Protein Intake: ${this.state.rec_daily_protein}`)
    console.log(`Carb Intake: ${this.state.rec_daily_carb}`);
    console.log(`Fat Intake: ${this.state.rec_daily_fat}`);
    console.log(`Water Intake: ${this.state.rec_daily_water}`)
    this.props.history.push('/');
  }
  loginUser = async () => {
    const {email, password} = this.state;
    await axios.post('/api/login', {email, password}).then(res => {
      this.props.updateUser(res.data);
    }).catch(err => {
      console.log(err);
    })
    this.props.history.push('/');
  }

  calculateCalorieIntake = () => {
    const {height, weight, age, activity_level, gender} = this.state;
    let mformula = (66 + (6.3 * +weight) + (12.9 * +height) + (6.8 * +age));
    let fformula = (655 + (4.3 * +weight) + (4.7 * +height) + (4.7 * +age));
    let calories = 0;
    if(gender === 'male'){
      if(+activity_level === 1){
        calories = +mformula*1.2
      }
      if(+activity_level === 2){
        calories = (+mformula*1.375);
      }
      if(+activity_level === 3){
        calories = mformula*1.55
      }
      if(+activity_level === 4){
        calories = mformula*1.725
      }
      if(+activity_level === 5){
        calories = mformula*1.9
      }
    }
    if(gender === 'female'){
      if(+activity_level === 1){
        calories = fformula*1.2
      }
      if(+activity_level === 2){
        calories = fformula*1.375
      }
      if(+activity_level === 3){
        calories = fformula*1.55
      }
      if(+activity_level === 4){
        calories = fformula*1.725
      }
      if(+activity_level === 5){
        calories = fformula*1.9
      }
    }
    this.setState({rec_daily_calorie: Math.round(calories)})
  }
  calculateProteinIntake = () => {
    const {weight} = this.state;
    this.setState({rec_daily_protein: Math.round((weight/2.20462)*.8)})
  }
  calculateCarbIntake = () => {
    const {rec_daily_calorie} = this.state;
    this.setState({rec_daily_carb: Math.round((rec_daily_calorie - (rec_daily_calorie*.55))/4)})
  }
  calculateFatIntake = () => {
    const {rec_daily_calorie, rec_daily_carb, rec_daily_protein} = this.state;
    this.setState({rec_daily_fat: Math.round((rec_daily_calorie - (rec_daily_protein*4) - (rec_daily_carb*4))/9)})
  }
  calculateWaterIntake = () => {
    const {weight, age} = this.state;
    if(age < 30){
      this.setState({rec_daily_water: Math.round((((weight/2.2)*40)/28.3)/8)})
    }
    if(age < 55){
      this.setState({rec_daily_water: Math.round((((weight/2.2)*35)/28.3)/8)})
    }
    if(age > 55){
      this.setState({rec_daily_water: Math.round((((weight/2.2)*30)/28.3)/8)})
    }
  }
  

  render(){
    if(this.props.location.pathname !== "/auth/register"){
    return(
      <div className='auth-container'>
        <div className='login-box'>
          <div className='logo'>
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
            <p className='title'>Nutrification</p>
          </div>
          <div className='login-inputs'>
            <h2>Login</h2>
            <input name='email' value={this.state.email} type='text' placeholder='Email' onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
            <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
            <button onClick={()=>this.loginUser()}>Login</button>
          </div>
          <div className='register-button'>
            New here? <i className="fas fa-arrow-right"></i>
            <Link to='/auth/register'><button>Register</button></Link>
          </div>
        </div>
      </div>
    )
    } else {
      return(
        <div className='auth-container'>
          <div className='login-box'>
            <div className='logo'>
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
              <p className='title'>Nutrification</p>
            </div>
            <div className={this.state.class}>
              <div className='login-inputs'>
                <h2>Register</h2>
                <div className='name-input'>
                  <input 
                  name='first_name' 
                  type='text'
                  value={this.state.first_name} 
                  placeholder='First Name'
                  onChange={(e)=>this.handleInput(e.target.name, e.target.value)}
                  />
                  <input 
                  name='last_name' 
                  value={this.state.last_name} 
                  type='text' 
                  placeholder='Last Name'
                  onChange={(e)=>this.handleInput(e.target.name, e.target.value)}
                  />

                </div>
                <input 
                  name='email' 
                  type='text' 
                  placeholder='Email'
                  onChange={(e)=>this.handleInput(e.target.name, e.target.value)}
                  />
                <input name='password' type='password' placeholder='Password'
                onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
                <input name='cpassword' type='password' placeholder='Confirm Password'
                onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
                <div className='error-container'>
                  <p className='error hidden'>Email already registered</p>
                  <p className={this.state.errorClass}><i className="fas fa-exclamation-circle"></i> Passwords do not match</p>
                </div>
                
                <div className='register-button'>
                  <button onClick={() => this.props.history.push('/auth/login')}>Login</button>
                  <button onClick={() => {
                    if(this.state.password !== this.state.cpassword){
                      this.setState({errorClass: 'error'})
                      setTimeout(() => this.setState({errorClass: 'error hidden'}), 5000)
                    } else {
                      this.setState({class: 'register-big right'})
                    }
                    }}>Next</button>
                </div>
              </div>
              <div className='login-inputs'>
                <div className='message'>
                  <h4>Great!</h4>
                  <p>Now we need some information. The information you give us will be used to personalize recommendations.</p>
                </div>
                <select name='activity_level' onChange={(e)=>this.handleInput(e.target.name, e.target.value)}>
                  <option value='0'>Activity Level</option>
                  <option value='1'>Little or No Exercise</option>
                  <option value='2'>Light Exercise 1-3 days/week</option>
                  <option value='3'>Moderate Exercise 3-5 days/week</option>
                  <option value='4'>Hard Exercise 6-7 days/week</option>
                  <option value='5'>Very Hard Exercise</option>
                </select>
                <select name='gender' onChange={(e)=>this.handleInput(e.target.name, e.target.value)}>
                  <option value='0'>Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
                <input 
                  name='height' 
                  type='number' 
                  value={this.state.height}
                  placeholder='Height (inches)'
                  onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
                <input 
                  name='weight' 
                  type='number'
                  value={this.state.weight} 
                  placeholder='Weight (pounds)'
                  onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
                <input 
                  name='age' 
                  type='number'
                  value={this.state.age} 
                  placeholder='Age (years)'
                  onChange={(e)=>this.handleInput(e.target.name, e.target.value)}/>
                <div className='register-button'>
                  <button onClick={() => this.setState({class: 'register-big'})}>Back</button>
                  <button onClick={() => this.registerUser()}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updateUser})(Auth);