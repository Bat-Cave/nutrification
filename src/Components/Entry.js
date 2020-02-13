import React, { Component } from 'react';
import axios from 'axios';


class Entry extends Component{
  constructor(props){
    super(props)

    this.state = {
      searchIn: '',
      brandIn: '',
      searchResults: [],
      meal: [],
      today: '',
      dateDefault: ''
    }
  }

  handleInput(name, val){
    this.setState({[name]: val})
  }

  getDate = () => {
    const d = new Date();
    const m = d.getMonth() + +1;
    const month = () => {
      if(m.toString.length < 2){
        return `0${d.getMonth()+ +1}`
      } else {
        return `${d.getMonth()+ +1}`
      }
    }
    const date = `${month()}/${d.getDate()}/${d.getFullYear()}`;
    const dateDefault = `${d.getFullYear()}-${month()}-${d.getDate()}`
    this.setState({today: date, dateDefault})
  }

  componentDidMount(){
    this.getDate();
  }

  search = () =>{
    const toSearch = this.state.searchIn.replace(/ /gi, '%20');

    if(this.state.brandIn){
      axios.get(`https://api.nal.usda.gov/fdc/v1/search?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x&generalSearchInput=${toSearch}&brandOwner=${this.state.brandIn}`).then(res => {
        this.setState({searchResults: res.data.foods})
      })
    } else {
      axios.get(`https://api.nal.usda.gov/fdc/v1/search?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x&generalSearchInput=${toSearch}`).then(res => {
        this.setState({searchResults: res.data.foods})
      })
    }
  }

  addToMeal(id, desc, brand){
    const newMeal = this.state.meal;
    newMeal.push({fdcId: id, description: desc, brandOwner: brand});
    this.setState({meal: newMeal})
  }


  render(){
    const searchResults = this.state.searchResults.map((e, i) => {
      return(
        <div key={e.fdcId} className='search-result'>
          <div className='search-column'><button onClick={() => this.addToMeal(e.fdcId, e.description, e.brandOwner)}><i className="fas fa-plus"></i></button></div>
          <div className='search-column f'>{e.fdcId}</div>
          <div className='search-column'>{e.description}</div>
          <div className='search-column'>{e.brandOwner}</div>
        </div>
      )
    })

    const mealItems = this.state.meal.map((e, i) => {
      return(
        <div key={e.fdcId} className='search-result'>
          <div className='search-column'>{this.state.today}</div>
          <div className='search-column f'>{e.fdcId}</div>
          <div className='search-column'>{e.description}</div>
          <div className='search-column'>{e.brandOwner}</div>
        </div>
      )
    })

    return(
      <div className='container'>
        <h1>NEW ENTRY</h1>
        <div className='entry-section'>
          <div className='date-input'>
            <input name='dateDefault' type='date' value={this.state.dateDefault} onChange={e => this.handleInput(e.target.name, e.target.value)}/>
          </div>
          <div className='search-container'>
            <div className='search-top'>
              <input name='searchIn' value={this.state.searchIn} type='search' autoComplete='off' placeholder='Search for food...' onChange={(e)=> this.handleInput(e.target.name, e.target.value)}/>
              <input name='brandIn' value={this.state.brandIn} type='search' placeholder='Brand (optional)...' onChange={(e)=> this.handleInput(e.target.name, e.target.value)}/>
              <button onClick={() => this.search()}><i className="fas fa-search"></i></button>
            </div>
            <div className='search-table'>
              <div className='search-header'>
                <div className='search-column h'>Add</div>
                <div className='search-column f h'>FDC ID</div>
                <div className='search-column h'>Description</div>
                <div className='search-column h'>Brand</div>
              </div>
              <div className='search-results'>
                {searchResults}
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className='entry-section'>
          <div className='search-top'>
            <h3>Meal</h3>
            <input name='mealName' type='text' placeholder='Meal Name...'/>
          </div>
          <div className='search-header'>
            <div className='search-column h'>Date</div>
            <div className='search-column f h'>FDC ID</div>
            <div className='search-column h'>Description</div>
            <div className='search-column h'>Brand</div>
          </div>
            <div className='search-results'>
              {mealItems}
            </div>
        </div>
      </div>
    )
  }
}
export default Entry;