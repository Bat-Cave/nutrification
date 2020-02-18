import React from 'react';
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
  console.log(props)
  return(
    <div className='container'>
      <h1>PROFILE</h1>
      <div className='prof-top'>
          <h2>{props.first_name} {props.last_name}</h2>
          <div className='prof-image'>
            <img src={props.profile_pic || 'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
            <input type='file' onChange={(e) => getSignedRequest(e.target.files, props.id)}/>
          </div>
      </div>
      <div className='prof-bottom'>
        <div className='profile-info'>
          <div className='profile-row'>
            <h4>Email:</h4>
            <p>{props.email}</p>
            {/* <input type='text'/> */}
          </div>
          <div className='profile-row'>
            <h4>Height:</h4>
            <p>{`${props.height} inches`}</p>
            {/* <input type='text'/> */}
          </div>
          <div className='profile-row'>
            <h4>Weight:</h4>
            <p>{`${props.weight} pounds`}</p>
            {/* <input type='text' /> */}
          </div>
          <div className='profile-row'>
            <h4>Gender:</h4>
            <p>{props.gender}</p>
            {/* <input type='text' /> */}
          </div>
          <div className='profile-row'>
            <h4>Age:</h4>
            <p>{props.age}</p>
            {/* <input type='text' /> */}
          </div>
          <div className='profile-row'>
            <h4>Activity Level:</h4>
            <p>{props.activity_level}</p>
            {/* <input type='text' /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {updatePic})(Profile);