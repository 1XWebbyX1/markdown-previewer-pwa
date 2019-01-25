import React from 'react'
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import Background from './Background/Background'
import store from '../redux/store'
import {mapStateToProps} from '../redux/utilities/mapping-functions'
import {mapDispatchToProps} from '../redux/utilities/mapping-functions'


//Create a redux react connected component---------------

const Container = connect(mapStateToProps, mapDispatchToProps)(Background);

//wrapping app to work with redux---------------
class Wrapper extends React.Component {
  render () {
     return (
      <Provider store={store}>
        <Container />
       </Provider>
     );
  }
}

export default Wrapper;
