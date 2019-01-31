import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons'


const Header = ({id, head, headerClass, onClick}) => (
  <div id={id} className={"header " + headerClass} >
     <h3>{head}</h3>
     <FontAwesomeIcon className='arrows' icon={faExpandArrowsAlt} onClick={onClick}/>
  </div>
)


export default Header;
