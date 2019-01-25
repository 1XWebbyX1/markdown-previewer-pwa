import React from 'react'
import marked from "marked";
import Toolbar from '../Toolbar/Toolbar'



marked.setOptions({
  breaks: true,
});

// INSERTS target="_blank" INTO HREF TAGS
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}
renderer.code = function(code, language) {
  return '<pre><code class=language-' + language + '>' + code + '</code></pre>';
}



class Preview extends React.Component {
  render() {
    return (
        <div className="preview">
            <Toolbar id="preview-tool" text='Previewer' onClick={this.props.onClick}/>
            <div id="view" dangerouslySetInnerHTML={{__html: marked(
            this.props.markdown, { renderer: renderer })}} />
       </div>
    );
  }
}

export default Preview;
