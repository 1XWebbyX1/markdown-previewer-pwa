import React from 'react'
import $ from 'jquery'
import '@fortawesome/fontawesome-free/css/all.css'

class Toolbar extends React.Component {

  render() {
    return (
       <div class="toolbar">
          <h3>{this.props.text}</h3>
          <i className='arrows fa fa-expand-arrows-alt' onClick={this.props.onClick}></i>
       </div>
    );
  }
}


export default Toolbar;
