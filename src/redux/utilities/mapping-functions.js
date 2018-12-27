import {addingInput} from '../store'

//mapping state and props to Redux to manage state-------
export  const mapStateToProps = (state)  => {
  return {
    markdown : state.markdown,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    addText : function(markdown) {
        dispatch(addingInput(markdown));
    }
  };
};
