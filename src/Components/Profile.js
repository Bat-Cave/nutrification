import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updatePic} from '../dux/reducer';

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
      axios.post('/api/profile/image', {url, id}).then(res => {
        console.log('success')
        updatePic(url);
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


const Profile = (props) => {

  const [editing, setEditing] = useState(false);

  return(
    <div className={props.containerClass}>
      <h1>PROFILE</h1>
      <div className='prof-top'>
          <h2>{props.first_name} {props.last_name}</h2>
          <div className='prof-image'>
            <img src={props.profile_pic || 'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
            <label id='profile-upload'>
              <input type='file' onChange={(e) => getSignedRequest(e.target.files, props.id)}/>
              <i className="fas fa-pen"></i> Change Profile Picture
            </label>
          </div>
      </div>
      <div className='prof-bottom'>
        <div className='profile-info'>
          <div className='profile-row'>
            <h4>Email:</h4>
            {editing ? <input type='text' placeholder={props.email}/> : <p>{props.email}</p> }
          </div>
          <div className='profile-row'>
            <h4>Height:</h4>
            {editing ? <input type='number' placeholder={`${props.height} inches`}/> : <p>{`${props.height} inches`}</p> }
          </div>
          <div className='profile-row'>
            <h4>Weight:</h4>
            {editing ? <input type='number' placeholder={`${props.weight} pounds`}/> : <p>{`${props.weight} pounds`}</p> }
          </div>
          <div className='profile-row'>
            <h4>Gender:</h4>
            {editing ? <input type='text' placeholder={props.gender}/> : <p>{props.gender}</p> }
          </div>
          <div className='profile-row'>
            <h4>Age:</h4>
            {editing ? <input type='number' placeholder={props.age}/> : <p>{props.age}</p> }
          </div>
          <div className='profile-row'>
            <h4>Activity Level:</h4>
            {editing ? <input type='text' placeholder={props.activity_level}/> : <p>{props.activity_level}</p> }
          </div>
          <button onClick={() => setEditing(!editing)}><i className="fas fa-pen"></i></button>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updatePic})(Profile);