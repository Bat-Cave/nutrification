import React, { Component } from 'react';
import axios from 'axios';


class Entry extends Component{
  constructor(props){
    super(props)

    this.state = {
      dateIn: '',
      searchIn: '',
      searchResults: []
    }
  }

  handleInput(name, val){
    this.setState({[name]: val})
  }

  search = () =>{
    axios.get('https://api.nal.usda.gov/fdc/v1/search?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x&generalSearchInput=Cheddar%20Cheese').then(res => {
      this.setState({searchResults: res.data.foods})
    })
  }


  render(){
    console.log(this.state.searchResults);
    const searchResults = this.state.searchResults.map((e, i) => {
      return(
        <div key={e.fdcId} className='search-result'>
          <div className='search-column'><button><i className="fas fa-plus"></i></button></div>
          <div className='search-column'>{e.fdcId}</div>
          <div className='search-column'>{e.description}</div>
          <div className='search-column'>{e.brandOwner}</div>
        </div>
      )
    })
    return(
      <div className='container'>
        <h1>NEW ENTRY</h1>
        <div className='entry-top'>
          <input name='dateIn' type='date' />
          <div className='search-container'>
            <input name='searchIn' type='search' placeholder='Search for food...'/>
            <button onClick={() => this.search()}><i className="fas fa-search"></i></button>
            <div className='search-table'>
              <div className='search-header'>
                <div className='column r'>Add</div>
                <div className='column r'>FDC ID</div>
                <div className='column r'>Description</div>
                <div className='column r'>Brand</div>
              </div>
              <div className='search-results'>
                {searchResults}
              </div>
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
}
export default Entry;