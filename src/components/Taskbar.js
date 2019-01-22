import React from 'react'
//import '@fortawesome/fontawesome-free/css/all.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faInfoCircle, faBold, faItalic, faQuoteLeft, faLink, faImage, faList, faListOl, faCode, faToggleOn} from '@fortawesome/free-solid-svg-icons'


class Taskbar extends React.Component{
  render(){
    return(
      <div id='taskbar'>
      <ul>
       <li><div onClick={this.props.save} className='fa fa-save'><FontAwesomeIcon id="save" className='fa fa-save icon' icon={faSave}/></div></li>
       <li><div onClick={this.props.toggleInfo} className='fa fa-info-circle'><FontAwesomeIcon id="info" className='fa fa-info-circle icon' icon={faInfoCircle}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-bold'><FontAwesomeIcon id="bold" className='fa fa-bold icon' icon={faBold}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-italic'><FontAwesomeIcon id="italic" className='fa fa-italic icon' icon={faItalic}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-quote-left'><FontAwesomeIcon id="quote" className='fa fa-quote-left icon' icon={faQuoteLeft}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-link'><FontAwesomeIcon id="link" className='fa fa-link icon' icon={faLink}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-image'><FontAwesomeIcon id="picture" className='fa fa-image icon' icon={faImage}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-list'><FontAwesomeIcon className='fa fa-list icon' icon={faList}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-list-ol'><FontAwesomeIcon className='fa fa-list-ol icon' icon={faListOl}/></div></li>
       <li><div onClick={this.props.onClick} className='fa fa-code'><FontAwesomeIcon className='fa fa-code icon' icon={faCode}/></div></li>
       <li><div onClick={this.props.switchTheme} className='fa fa-toggle-on'><FontAwesomeIcon id="theme-switch" className='fa fa-toggle-on icon' icon={faToggleOn}/></div></li>
       </ul>
      </div>

    )
  }
}

export default Taskbar;
