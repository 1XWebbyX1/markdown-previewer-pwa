import React from 'react'
import Wrapper from './Wrapper/Wrapper.js'
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import store from './redux/store'
import {addingInput, toggleAnim, toggleTheme, setView} from './redux/store'

const mapStateToProps = (state)  => {
  return {
    markdown : state.markdown,
    animClass: state.animClass,
    theme: state.theme,
    editorView: state.editorView,
    previewerView: state.previewerView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addText : function(markdown) {
        dispatch(addingInput(markdown));
    },
    toggleAnimClass : function(className) {
        dispatch(toggleAnim(className));
    },
    switchTheme : function(theme) {
        dispatch(toggleTheme(theme));
    },
    setView : function(editorView, previewerView) {
        dispatch(setView(editorView, previewerView));
    },
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

//wrapping app to work with redux---------------
class ConnectedComponent extends React.Component {
  render () {
     return (
      <Provider store={store}>
        <Container />
       </Provider>
     );
  }
}

export default ConnectedComponent;
