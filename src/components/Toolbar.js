import React from 'react'

class Toolbar extends React.Component {

  render() {
    return (
       <div class="toolbar">
          <h3>{this.props.text}</h3>
       </div>
    );
  }
}


export default Toolbar;
