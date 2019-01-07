import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'


class Taskbar extends React.Component{
  render(){
    return(
      <div id='taskbar'>
      <ul>
       <li><i id="save" class='fa fa-save' onClick={this.props.save}></i></li>
       <li><i id="info" onClick={this.props.toggleInfo} class='fa fa-info-circle'></i></li>
       <li><i id="bold" onClick={this.props.onClick} className='fa fa-bold'></i></li>
       <li><i id="italic" onClick={this.props.onClick} className='fa fa-italic'></i></li>
       <li><i id="quote" onClick={this.props.onClick} className='fa fa-quote-left'></i></li>
       <li><i id="link" onClick={this.props.onClick} className='fa fa-link'></i></li>
       <li><i id="picture" onClick={this.props.onClick} className='fa fa-image'></i></li>
       <li><i  onClick={this.props.onClick} className="fa fa-list"/></li>
       <li><i  onClick={this.props.onClick} className="fa fa-list-ol"/></li>
       <li><i  onClick={this.props.onClick} className="fa fa-code"/></li>
       <li><i id="theme-switch" class='fa fa-toggle-on' onClick={this.props.switchTheme}></i></li>
       </ul>
      </div>

    )
  }
}

export default Taskbar;
