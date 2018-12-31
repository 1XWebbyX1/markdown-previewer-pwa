import React from 'react'
import asyncComponent from './asyncComponent/async'


const Toolbar = asyncComponent(() =>
        import('./Toolbar').then(module => module.default)
);


class Editor extends React.Component {
  render() {
    return (
        <div class="editor">
           <Toolbar id="edit-tool" text='Editor' onClick={this.props.onClick}/>
            <textarea onChange={this.props.onChange} value={this.props.markdown} type="text"/>
        </div>
    );
  }
}


export default Editor;
