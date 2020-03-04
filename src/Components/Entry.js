import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


class Entry extends Component{
  constructor(props){
    super(props)

    this.state = {
      searchIn: '',
      brandIn: '',
      waterIntake: 0,
      servings: 1,
      searchResults: [],
      meal: [],
      details: 0,
      today: '',
      time: '', 
      dateDefault: '',
      mealName: '',
      containerClass: 'container',
      entryClass: 'entry-wrapper'
    }
  }

  handleInput(name, val){
    this.setState({[name]: val})
  }

  getDate = () => {
    const d = new Date();
    const m = d.getMonth() + +1;
    let h = d.getHours();
    if(h > 12){
      h -= 12;
    }
    const min = d.getMinutes();
    const month = () => {
      if(m.toString.length < 2){
        return `0${d.getMonth()+ +1}`
      } else {
        return `${d.getMonth()+ +1}`
      }
    }
    const date = `${month()}/${d.getDate()}/${d.getFullYear()}`;
    const dateDefault = `${d.getFullYear()}-${month()}-${d.getDate()}`
    this.setState({today: date, dateDefault, time: `${h}:${min}`})
  }

  componentDidMount(){
    this.getDate();
    setTimeout(() => {
      this.setState({containerClass: 'container left'})
    }, 1000);
  }

  search = () =>{
    const toSearch = this.state.searchIn.replace(/ /gi, '%20');

    if(this.state.brandIn){
      axios.get(`https://api.nal.usda.gov/fdc/v1/search?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x&generalSearchInput=${toSearch}&brandOwner=${this.state.brandIn}`).then(res => {
        this.setState({searchResults: res.data.foods})
      })
    } else {
      axios.get(`https://api.nal.usda.gov/fdc/v1/search?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x&generalSearchInput=${toSearch}&sortField=dataType.keyword`).then(res => {
        this.setState({searchResults: res.data.foods})
      })
    }
  }

  addToMeal(servings, id, desc, brand){
    const newMeal = this.state.meal;
    newMeal.push({date: this.state.dateDefault, servings, fdcId: id, description: desc, brandOwner: brand});
    this.setState({meal: newMeal, servings: 1})

  }

  removeFromMeal = (id) =>{
    let mealToDestroy = this.state.meal
    mealToDestroy.splice(id, 1)
    this.setState({meal: mealToDestroy})
  }

  addMeal = async () =>{
    const ids = [];
    const items = [];
    const convertedDate = this.state.dateDefault.split('-');
    let year = convertedDate[0];
    convertedDate[3] = year;
    convertedDate.shift();
    const nutrients = {
      user_id: this.props.userReducer.id,
      meal_name: this.state.mealName,
      entry_date: convertedDate.join('/'),
      entry_time: this.state.time,
      you_ate: '',
      biotin: 0,
      folic_acid: 0,
      niacin: 0,
      pantothenic_acid: 0,
      riboflavin: 0,
      thiamin: 0,
      vitamin_a: 0,
      vitamin_b6: 0,
      vitamin_b12: 0,
      vitamin_c: 0,
      vitamin_d: 0,
      vitamin_e: 0,
      vitamin_k: 0,
      calcium: 0,
      chloride: 0,
      chromium: 0,
      copper: 0,
      iodine: 0,
      iron: 0,
      magnesium: 0,
      mangenese: 0,
      molybdenum: 0,
      phosphorus: 0,
      potassium: 0,
      selenium: 0,
      sodium: 0,
      zinc: 0,
      protein: 0,
      fiber: 0,
      water: +this.state.waterIntake,
      carbohydrates: 0,
      sugar: 0,
      fat: 0,
      calories: 0,
      alcohol: 0,
      caffeine: 0
    }
    for(let i = 0; i < this.state.meal.length; i++) {
      ids.push(this.state.meal[i].fdcId)
    }
    for(let j = 0; j < ids.length; j++){
      await axios.get(`https://api.nal.usda.gov/fdc/v1/${ids[j]}?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x`).then(res => {
        items.push(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
    console.log(items)
    for(let k = 0; k < items.length; k++){
      nutrients.you_ate += `| ${items[k].description}`;
      for(let l = 0; l < items[k].foodNutrients.length; l++){
          let {rank, name, unitName} = items[k].foodNutrients[l].nutrient;
          let amount = ((items[k].foodNutrients[l].amount*items[k].servingSize)/100) || items[k].foodNutrients[l].amount;
          if(items[k].foodNutrients[l].nutrient.name.includes('Biotin')){
            nutrients.biotin += amount*this.state.meal[k].servings;
          }
          if(rank === 6900 || rank === 7100 || rank ===7200){
            nutrients.folic_acid += amount*this.state.meal[k].servings;
          }
          if(rank === 6700){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.pantothenic_acid += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.pantothenic_acid += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 6600){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.niacin += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.niacin += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 6500){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.riboflavin += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.riboflavin += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 6400){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.thiamin += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.thiamin += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 7420 || rank === 7500){
            nutrients.vitamin_a += amount*this.state.meal[k].servings;
          }
          if(rank === 6800){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.vitamin_b6 += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.vitamin_b6 += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 7300 || rank === 7340){
            nutrients.vitamin_b12 += amount*this.state.meal[k].servings;
          }
          if(rank === 6300){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.vitamin_c += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.vitamin_c += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 8650 || rank === 8700){
            nutrients.vitamin_d += amount*this.state.meal[k].servings;
          }
          if(rank === 7905 || rank ===7920){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.vitamin_e += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.vitamin_e += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 8800){
            nutrients.vitamin_k += amount*this.state.meal[k].servings;
          }
          if(rank === 5300){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.calcium += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.calcium += amount*this.state.meal[k].servings;
            }
          }
          if(name.includes('Chloride')){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.chloride += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.chloride += amount*this.state.meal[k].servings;
            }
          }
          if(name.includes('Chromium')){
            nutrients.chromium += amount*this.state.meal[k].servings;
          }
          if(rank === 6000){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.copper += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.copper += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 6150){
            nutrients.iodine += amount*this.state.meal[k].servings;
          }
          if(rank === 5400){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.iron += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.iron += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 5500){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.magnesium += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.magnesium += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 6100){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.mangenese += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.mangenese += amount*this.state.meal[k].servings;
            }
          }
          if(name.includes('Molybdenum')){
            nutrients.molybdenum += amount*this.state.meal[k].servings;
          }
          if(rank === 5600){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.phosphorus += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.phosphorus += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 5700){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.potassium += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.potassium += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 6200){
            nutrients.selenium += amount*this.state.meal[k].servings;
          }
          if(rank === 5800){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.sodium += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.sodium += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 5900){
            if(unitName === 'mcg' || unitName === 'µg'){
              nutrients.zinc += (amount/1000)*this.state.meal[k].servings;
            } else{
              nutrients.zinc += amount*this.state.meal[k].servings;
            }
          }
          if(rank === 600){
            nutrients.protein += amount*this.state.meal[k].servings;
          }
          if(rank === 1200){
            nutrients.fiber += amount*this.state.meal[k].servings;
          }
          if(rank === 1100 || rank === 1110){
            nutrients.carbohydrates += amount*this.state.meal[k].servings;
          }
          if(rank === 1520 || rank === 1510){
            nutrients.sugar += amount*this.state.meal[k].servings;
          }
          if(rank === 800 || rank === 11400 || rank === 12900 || rank === 15400){
            nutrients.fat += amount*this.state.meal[k].servings;
          }
          if(rank === 300){
            nutrients.calories += amount*this.state.meal[k].servings;
          }
          if(rank === 18200){
            nutrients.alcohol += amount*this.state.meal[k].servings;
          }
          if(rank === 18300){
            nutrients.caffeine += amount*this.state.meal[k].servings;
          }
      }
    }
    console.log(nutrients)
    axios.post('/api/addMeal', {nutrients}).then(res => {
      console.log(`Meal ID: ${res.data}`)
      console.log(res.data);
    }).catch(err => {
      console.log(err)
    })
    setTimeout(() => {
      this.props.history.push('/');
    }, 1000)
  }

  getDetails = (id) => {
    axios.get(`https://api.nal.usda.gov/fdc/v1/${id}?api_key=qESsREuVONxc32eM2XaBFLJU5FsTTMc7c0ZZ6f8x`).then(res => {
      this.setState({details: res.data})
    })
  }

  next = () => {
    if(this.state.entryClass === 'entry-wrapper'){
      this.setState({entryClass: 'entry-wrapper slide-left'})
    } else {
      this.setState({entryClass: 'entry-wrapper'})
    }
  }

  render(){
    const searchResults = this.state.searchResults.map((e, i) => {
      let brandOwner = '';
      if(e.brandOwner){
        brandOwner = e.brandOwner.replace(/(\B)[^ ]*/g,match =>(match.toLowerCase())).replace(/^[^ ]/g,match=>(match.toUpperCase()));
      } else {
        brandOwner = '';
      };
      return(
        <div key={e.fdcId} className='search-result'>
          <div className='search-column'>
            <button onClick={() => this.addToMeal(this.state.servings, e.fdcId, e.description, e.brandOwner)}><i className="fas fa-plus"></i></button>
            <input name='servings' type='number' value={this.state.servings} onChange={e => this.handleInput(e.target.name, e.target.value)}/>
          </div>
          <div className='search-column f'><button onClick={() => this.getDetails(e.fdcId)}>{e.fdcId}</button></div>
          <div className='search-column'>{e.description.replace(/(\B)[^ ]*/g,match =>(match.toLowerCase())).replace(/^[^ ]/g,match=>(match.toUpperCase()))}</div>
          <div className='search-column'>{brandOwner}</div>
        </div>
      )
    })

    const mealItems = this.state.meal.map((e, i) => {
      let brandOwner = '';
      if(e.brandOwner){
        brandOwner = e.brandOwner.replace(/(\B)[^ ]*/g,match =>(match.toLowerCase())).replace(/^[^ ]/g,match=>(match.toUpperCase()));
      } else {
        brandOwner = '';
      };
      return(
        <div key={i} className='search-result'>
          <div className='search-column'>
            <button onClick={() => this.removeFromMeal(i)}><i className="fas fa-trash-alt"></i></button> 
            <p><i className="fas fa-utensils"></i> {e.servings}</p>
          </div>
          <div className='search-column f'>{e.fdcId}</div>
          <div className='search-column'>{e.description.replace(/(\B)[^ ]*/g,match =>(match.toLowerCase())).replace(/^[^ ]/g,match=>(match.toUpperCase()))}</div>
          <div className='search-column'>{brandOwner}</div>
        </div>
      )
    })
    return(
      <div className={this.props.reducer.containerClass}>
        <h1>NEW ENTRY</h1>
        <div className={this.state.entryClass}>
          <div className='entry-section m-right'>
            <div className='date-input'>
              <p>Date: </p>
              <input name='dateDefault' type='date' value={this.state.dateDefault} onChange={e => this.handleInput(e.target.name, e.target.value)}/>
            </div>
            <div className='search-container'>
              <div className='search-top'>
                <input name='searchIn' value={this.state.searchIn} type='search' autoComplete='off' placeholder='Search for food...' onChange={(e)=> this.handleInput(e.target.name, e.target.value)}/>
                <input name='brandIn' value={this.state.brandIn} type='search' placeholder='Brand (optional)...' onChange={(e)=> this.handleInput(e.target.name, e.target.value)}/>
                <button onClick={() => this.search()}><i className="fas fa-search"></i></button>
              </div>
              <div className='search-table top'>
                <div className='search-header'>
                  <div className='search-column h'>Servings</div>
                  <div className='search-column f h'>FDC ID</div>
                  <div className='search-column h'>Description</div>
                  <div className='search-column h'>Brand</div>
                </div>
                <div className='search-results'>
                  {searchResults.length === 0 ? <div className='div'>Search something above.</div> : searchResults}
                  {this.state.details !== 0 ? <div className='food-details'>
                    <div className='food-details-container'>
                      <h3>NUTRITION FACTS</h3>
                      <button onClick={() => this.setState({details: 0})}>X</button>
                    </div>
                  </div> : null}
                </div>
              </div>
            </div>
            <div id='next-container'>
              <button onClick={() => this.next()}>Next</button>
            </div>
          </div>
          <div className='entry-section m-left'>
            <div className='search-top'>
              <h3>Meal</h3>
                <div className='water-container'>
                  <p>Cups of Water: </p>
                  <input id='water-intake' name='waterIntake' onChange={(e)=> this.handleInput(e.target.name, e.target.value)} value={this.state.waterIntake} type='number' />
                </div>
              <div className='add-meal'>
                <input id='stupid-input' name='mealName' type='text' onChange={(e)=> this.handleInput(e.target.name, e.target.value)} placeholder='Meal Name...'/>
                <button onClick={() => this.addMeal()}>Add Meal</button>
              </div>
            </div>
            <div className='search-header'>
              <div className='search-column h g'>Servings</div>
              <div className='search-column f h g'>FDC ID</div>
              <div className='search-column h g'>Description</div>
              <div className='search-column h g'>Brand</div>
            </div>
              <div className='search-results'>
                {mealItems.length === 0 ? <div className='div'>Add an item from the search results.</div> : mealItems}
              </div>
            <button onClick={() => this.next()}>Back</button>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, null)(Entry);