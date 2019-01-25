import React from 'react'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'
//import '@fortawesome/fontawesome-free/css/all.css'

class Toolbar extends React.Component {

  render() {
    return (
       <div class="toolbar">
          <h3>{this.props.text}</h3>
          <div onClick={this.props.onClick}><FontAwesomeIcon className='arrows' icon={faExpandArrowsAlt} /></div>
       </div>
    );
  }
}


export default Toolbar;
