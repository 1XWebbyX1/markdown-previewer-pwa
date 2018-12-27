import {createStore} from 'redux'
import {placeholder} from '../data/strings'


const ADDTEXT = 'ADDTEXT';

//redux action creator_____________________________________________
export const addingInput = (markdown) => {
  return {
   type: ADDTEXT,
   markdown: markdown
  };
};
//--------------------------------------------------------------------

//redux reducer function_____________________________________________
const reducer = (state = {markdown: placeholder}, action) => {
  switch(action.type){
    case ADDTEXT : return {markdown: action.markdown};
    default: return state;
  };
};
//----------------------------------------------------------------


//declaring redux store___________________________________________
const store = createStore(reducer);
//------------------------------------------------

export default store;
