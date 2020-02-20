const initialState = {
  mealHistory: {},
  containerClass: 'container'
}

const UPDATE_MEAL_HISTORY = 'UPDATE_MEAL_HISTORY';
const UPDATE_CONTAINER_CLASS = 'UPDATE_CONTAINER_CLASS';

export default function reducer(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case UPDATE_MEAL_HISTORY:
      return {
        ...state,
        mealHistory: payload.mealHistory       
      }
    case UPDATE_CONTAINER_CLASS:
      return {
        ...state,
        containerClass: payload      
      }
    default:
      return state;
  }
}

export function updateMealHistory(mealHistory) {
  return {
    type: UPDATE_MEAL_HISTORY,
    payload: mealHistory
  }
}

export function updateContainerClass(containerClass) {
  return {
    type: UPDATE_CONTAINER_CLASS,
    payload: containerClass
  }
}