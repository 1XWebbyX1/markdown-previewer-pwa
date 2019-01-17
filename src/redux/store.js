import {createStore} from 'redux'
import {placeholder} from '../data/strings'

/*var placeholder;

 import('../data/strings')
  .then((module) => {
    placeholder = module.placeholder;
  });*/

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
