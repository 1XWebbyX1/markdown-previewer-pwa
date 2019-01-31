import {createStore} from 'redux'
import {placeholder} from './data/strings'

const ADDTEXT = 'ADDTEXT';
const TOGGLE_CLASS = 'TOGGLE_CLASS';
const SWITCH_THEME = 'SWITCH_THEME';
const SET_VIEW = 'SET_VIEW';

const initialState = {
  markdown: placeholder,
  animClass: '',
  theme: 'dark',
  editorView: '',
  previewerView: ''
}

//redux action creator_____________________________________________
export const addingInput = (markdown) => {
  return {
   type: ADDTEXT,
   markdown: markdown
  };
};

export const toggleAnim = (anim) => {
  return {
   type: TOGGLE_CLASS,
   animClass: anim
  };
};

export const toggleTheme = (theme) => {
  return {
   type: SWITCH_THEME,
   theme: theme
  };
};

export const setView = (editor, previewer) => {
  return {
   type: SET_VIEW,
   editorView: editor,
   previewerView: previewer
  };
};

//--------------------------------------------------------------------

//redux reducer function_____________________________________________
const reducer = (state = initialState, action) => {
  switch(action.type){
    case ADDTEXT : return {markdown: action.markdown, wrapperClass: state.wrapperClass, theme: state.theme, editorView: state.editorView, previewerView: state.previewerView};
    case TOGGLE_CLASS : return {markdown: state.markdown, animClass: action.animClass, theme: state.theme, editorView: state.editorView, previewerView: state.previewerView};
    case SWITCH_THEME : return {markdown: state.markdown, animClass: state.animClass, theme: action.theme, editorView: state.editorView, previewerView: state.previewerView};
    case SET_VIEW : return {markdown: state.markdown, animClass: state.animClass, theme: state.theme, editorView: action.editorView, previewerView: action.previewerView};
    default: return state;
  };
};
//----------------------------------------------------------------


//declaring redux store___________________________________________
const store = createStore(reducer);
//------------------------------------------------

export default store;
