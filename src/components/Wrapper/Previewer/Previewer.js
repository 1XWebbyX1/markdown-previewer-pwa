import React from 'react'
import marked from "marked"

const renderer = new marked.Renderer();

// INSERTS target="_blank" INTO HREF TAGS
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}
renderer.code = function(code, language) {
  return '<pre><code class=language-' + language + '>' + code + '</code></pre>';
}

marked.setOptions({
  breaks: true,
});


const Previewer = ({markdown}) => (
  <div className="textarea preview">
    <div id="view" dangerouslySetInnerHTML={{__html: marked(
            markdown, { renderer: renderer })}} />
   </div>
)


export default Previewer;
