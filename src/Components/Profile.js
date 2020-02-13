import React from 'react';
import { uploadFile } from 'react-s3';
import axios from 'axios';


const config = {
  bucketName: 'nutrification',
  dirName: 'images',
  region: 'us-west-1',
  accessKeyId: 'AKIAJD6BEFPJUNSBAR5Q',
  secretAccessKey: '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',
}

let profile = '';

const upload = (e) =>{
  let file = e.target.files[0];
  let name = 'user/' + file.name;
  file = {...file, name: name};
  uploadFile( file, config)
  .then( (data) => {
    profile = data.location
    console.log(profile);
    axios.post('/api/profile/image').then(res => {
      console.log('Updated Profile Picture')
    }).catch(err => {
      console.log(err)
    })
  })
  .catch( (err) => {
    alert(err);
  })
}


const Profile = (props) => {
  return(
    <div className='container'>
      <h1>PROFILE</h1>
      <div className='prof-top'>
          <h2>{'{User_First}'}{'{User_Last}'}</h2>
          <div className='prof-image'>
            <img src={profile || 'https://static.scrum.org/web/images/profile-placeholder.png'} alt='profile'/>
            <input type='file' onChange={upload}/>
          </div>
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
          <div className='profile-row'>
            <h4>{profile.toString()}</h4>
            <input type='text' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;