const initialState = {
  first_name: '',
  last_name: '',
  email: '',
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


const UPDATE_USER = 'UPDATE_USER';

export default function reducer(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case UPDATE_USER:
      return {
        ...state,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        activity_level: payload.activity_level,
        height: payload.height,
        weight: payload.weight,
        age: payload.age,
        gender: payload.gender,
        rec_daily_calorie: payload.rec_daily_calorie,
        rec_daily_protein: payload.rec_daily_protein,
        rec_daily_carb: payload.rec_daily_carb,
        rec_daily_fat: payload.rec_daily_fat,
        rec_daily_water: payload.first_name        
      }

    default:
      return state;
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}