import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatePic, updateUser} from '../dux/userReducer';




const Profile = (props) => {
  const activityLevels = ['Activity Level','Little or No Exercise', 'Light Exercise 1-3 days/week', 'Moderate Exercise 3-5 days/week','Hard Exercise 6-7 days/week', 'Very Hard Exercise']
  const uploadFile = (file, signedRequest, id) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
  
    axios
      .put(signedRequest, file, options)
      .then(response => {
        let file = response.config.data.name;
        let baseUrl = 'https://nutrification.s3.us-west-1.amazonaws.com/nutrification-profile-'
        let url = (`${baseUrl}${file}`)
        axios.post('/api/profile/image', {url, id}).then(async res => {
          console.log('success')
          updatePic(url);
          await axios.get('/api/me').then(res => {
            props.updateUser(res.data)
          }).catch(err => {
            console.log(err);
            props.history.push('/')
          })
        }).catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };
  
  
  
  const getSignedRequest = ([file], id) => {
    console.log(file);
  
    const fileName = `nutrification-profile-${file.name.replace(/\s/g, '-')}`
  
    axios.get('/sign-s3', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then( (response) => {
      const { signedRequest} = response.data 
      uploadFile(file, signedRequest, id)
    }).catch( err => {
      console.log(err)
    })
  }
  const [editing, setEditing] = useState(false);
  const [submitClass, setSubmitClass] = useState('profile-submit hidden');
  const [profileInfo, setProfileInfo] = useState({
    email: props.userReducer.email,
    height: props.userReducer.height,
    weight: props.userReducer.weight,
    gender: props.userReducer.gender,
    age: props.userReducer.age,
    activity_level: props.userReducer.activity_level
  })

  const toggleEdit = () => {
    setEditing(!editing)
    if(submitClass === 'profile-submit'){
      setSubmitClass('profile-submit hidden')
    } else {
      setSubmitClass('profile-submit')
    }
  }

  const handleInput = (name, val) => {
    setProfileInfo({...profileInfo, [name]: val})
  }

  const handleSubmit = () => {
    const {email, height, weight, gender, age, activity_level} = profileInfo
    axios.put(`/api/updateUser/${props.userReducer.id}`, {email, height, weight, gender, age, activity_level}).then(res => {
      console.log(res.data)
      props.updateUser(res.data)
      setTimeout(() => {
        props.history.push('/');
      }, 1000)
    })
  }


  return(
    <div className={props.reducer.containerClass}>
      <h1>PROFILE</h1>
      <div className='prof-top'>
          <h2>{props.userReducer.first_name} {props.userReducer.last_name}</h2>
          <div className='prof-image'>
            <img src={props.userReducer.profile_pic || 'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
            <label id='profile-upload'>
              <input type='file' onChange={(e) => getSignedRequest(e.target.files, props.userReducer.id)}/>
              <i className="fas fa-pen"></i> Change Profile Picture
            </label>
          </div>
      </div>
      <div className='prof-bottom'>
        <div className='profile-info'>
          <div className='profile-row'>
            <h4>Email:</h4>
            {editing ? <input name='email' type='text' placeholder={props.userReducer.email} onChange={(e) => handleInput(e.target.name, e.target.value)}/> : <p>{props.userReducer.email}</p> }
          </div>
          <div className='profile-row'>
            <h4>Height:</h4>
            {editing ? <input name='height' type='number' placeholder={`${props.userReducer.height} inches`} onChange={(e) => handleInput(e.target.name, e.target.value)}/> : <p>{`${props.userReducer.height} inches`}</p> }
          </div>
          <div className='profile-row'>
            <h4>Weight:</h4>
            {editing ? <input name='weight' type='number' placeholder={`${props.userReducer.weight} pounds`} onChange={(e) => handleInput(e.target.name, e.target.value)}/> : <p>{`${props.userReducer.weight} pounds`}</p> }
          </div>
          <div className='profile-row'>
            <h4>Gender:</h4>
            {editing ? <input name='gender' type='text' placeholder={props.userReducer.gender} onChange={(e) => handleInput(e.target.name, e.target.value)}/> : <p>{props.userReducer.gender}</p> }
          </div>
          <div className='profile-row'>
            <h4>Age:</h4>
            {editing ? <input name='age' type='number' placeholder={props.userReducer.age} onChange={(e) => handleInput(e.target.name, e.target.value)}/> : <p>{props.userReducer.age}</p> }
          </div>
          <div className='profile-row'>
            <h4>Activity Level:</h4>
            {editing ? <select name='activity_level' onChange={(e)=> handleInput(e.target.name, e.target.value)}>
                  <option value='0'>Activity Level</option>
                  <option value='1'>Little or No Exercise</option>
                  <option value='2'>Light Exercise 1-3 days/week</option>
                  <option value='3'>Moderate Exercise 3-5 days/week</option>
                  <option value='4'>Hard Exercise 6-7 days/week</option>
                  <option value='5'>Very Hard Exercise</option>
                </select> : <p>{activityLevels[props.userReducer.activity_level]}</p> }
          </div>
          <div className='profile-row'>
            <button onClick={() => toggleEdit()}>{editing ? <i className="fas fa-times"></i> : <i className="fas fa-pen"></i>}</button>
            <button className={submitClass} onClick={() => handleSubmit()}><i className="fas fa-check"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updatePic, updateUser})(Profile);