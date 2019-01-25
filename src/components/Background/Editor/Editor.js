import React from 'react'
import Toolbar from '../Toolbar/Toolbar'



class Editor extends React.Component {
  render() {
    return (
        <div className="editor">
           <Toolbar id="edit-tool" text='Editor' onClick={this.props.onClick}/>
            <textarea id='textarea' onChange={this.props.onChange} value={this.props.markdown} type="text"/>
        </div>
    );
  }
}


export default Editor;
