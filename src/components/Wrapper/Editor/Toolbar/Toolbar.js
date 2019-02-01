import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faArrowLeft, faBold, faItalic, faLink, faCode, faImage, faToggleOn} from '@fortawesome/free-solid-svg-icons'



class Toolbar extends React.Component{
  constructor(props){
    super(props);
    this.icon = faInfoCircle;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.icon = (this.icon === faInfoCircle) ? faArrowLeft : faInfoCircle;
    this.props.toggleInfo();
  }

  render(){
    return(
     <div className={'toolbar ' + this.props.className} >
        <ul>
         <li><FontAwesomeIcon className='icon info' icon={this.icon} onClick={this.handleClick}/></li>
         <li><FontAwesomeIcon className='icon bold' icon={faBold} onClick={this.props.onClick}/></li>
         <li><FontAwesomeIcon className='icon italic' icon={faItalic} onClick={this.props.onClick}/></li>
         <li><FontAwesomeIcon className='icon img' icon={faImage} onClick={this.props.onClick}/></li>
         <li><FontAwesomeIcon className='icon link' icon={faLink} onClick={this.props.onClick}/></li>
         <li><FontAwesomeIcon className='icon code' icon={faCode} onClick={this.props.onClick}/></li>
         <li><FontAwesomeIcon className='icon toggle' icon={faToggleOn} onClick={this.props.switchTheme}/></li>
       </ul>
      </div>

    )
  }
}

export default Toolbar;
