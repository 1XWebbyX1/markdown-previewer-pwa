import React from 'react'
import Toolbar from './Toolbar/Toolbar.js'

const Editor = React.forwardRef((props, ref) => (
  <div className='editor'>
      <Toolbar className={props.headerClass} onClick={props.onClick} switchTheme={props.switchTheme} toggleInfo={props.toggleInfo}/>
      <textarea ref={ref} onChange={props.onChange} value={props.markdown} className={props.textareaClass} type="text"/>
  </div>
));


export default Editor;
