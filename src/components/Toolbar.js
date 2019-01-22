import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'

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
