import React from 'react'
import marked from "marked";
import asyncComponent from './asyncComponent/async'


const Toolbar = asyncComponent(() =>
        import('./Toolbar').then(module => module.default)
);


const renderer = new marked.Renderer();


class Preview extends React.Component {
  render() {
    return (
        <div class="preview">
            <Toolbar id="preview-tool" text='Previewer'/>
            <div id="view" dangerouslySetInnerHTML={{__html: marked(
            this.props.markdown, { renderer: renderer })}} />
       </div>
    );
  }
}

export default Preview;
