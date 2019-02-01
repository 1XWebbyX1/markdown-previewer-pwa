import React from 'react'
import Editor from './Editor/Editor.js'
import Previewer from './Previewer/Previewer.js'
import Header from './Header/Header.js'

class Wrapper extends React.Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.insertAtCaret = this.insertAtCaret.bind(this);
    this.insertStyle = this.insertStyle.bind(this);
    this.setTextSelect = this.setTextSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.expandEditor = this.expandEditor.bind(this);
    this.expandPreviewer = this.expandPreviewer.bind(this);
    this.info = '';
    this.markdown = '';
    this.showInfo = false;
    this.textarea = React.createRef();
  }

  componentDidMount(){
    import('./data/strings')
    .then(module => {
      this.info = module.info;
      this.markdown = module.placeholder;
    })
    .catch(err => {
      this.info = '# For info visit https://marked.js.org/#/README.md';
    })
  }

  toggleInfo(){
    this.showInfo = !this.showInfo; //show placeholder or info based on boolean
    (this.showInfo)  ? //condition for info on display
     this.props.addText(this.info) : //if true
     this.props.addText(this.markdown); //if false
  }

  switchTheme(){
    this.props.toggleAnimClass('blinks'); //add class
    setTimeout(function(){
      this.props.toggleAnimClass('');//remove class
    }.bind(this), 1500);

     (this.props.theme === "dark")  ? //condition for dark theme
      this.props.switchTheme('light') : //if true
      this.props.switchTheme('dark'); //if false
  }

  expandEditor(){
    (this.props.editorView === "")  ? //condition for normal editor view mode
     this.props.setView('fullScreen', 'minimize') : //if true
     this.props.setView('', ''); //if false
  }

  expandPreviewer(){
    (this.props.previewerView === "")  ? //condition for normal previewer view mode
     this.props.setView('minimize', 'fullScreen') : //if true
     this.props.setView('', ''); //if false
  }

  handleChange(e){
     this.props.addText(e.target.value); //update on editor input field change
  }

  insertAtCaret(value){
    var field = this.textarea.current;
    if(document.selection){ //older IE support
       field.focus();
       var selection = document.selection.createRange();
       selection.text = value;
    }else if(field.selectionStart || field.selectionStart == '0'){ //other browsers
        let startPos = field.selectionStart;
        let endPos = field.selectionEnd;
        field.focus();
        field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
        this.setTextSelect(startPos + this.charLength, startPos + value.length - this.charLength);
    }else {
       field.value += value;
    }
  }

  setTextSelect(caretStart, caretEnd){ //selected text when string is inserted
     var field = this.textarea.current;
      if(field.selectionStart){
        field.setSelectionRange(caretStart, caretEnd);
     }
  }

  insertStyle(value){
    var field = this.textarea.current;
    let startPos = field.selectionStart;
    let endPos = field.selectionEnd;

    if(value !== undefined){
        this.insertAtCaret(value);
    }
  }

  handleClick(e){
    let text_to_insert,
     target = e.currentTarget.className.baseVal, //to extract class from font awesome svg
     styleRegex = /\sfa-[a-z]+\s/, //extract fontawesome style
     style = '' + target.match(styleRegex)[0].trim();

    switch(style){
      case 'fa-bold' :  text_to_insert = '**Strong Text**';
                        this.charLength = 2;
                        break;
      case 'fa-italic' : text_to_insert = '_Emphasized Text_';
                        this.charLength = 1;
                        break;
      case 'fa-code' : text_to_insert = '`Inline Code`';
                        this.charLength = 1;
                        break;
      case 'fa-image' : text_to_insert = '![Alt Text](http://)';
                       this.charLength = 0;
                       break;
      case 'fa-link' : text_to_insert = '[link](http://)';
                       this.charLength = 0;
                       break;
      default: return;
    }
    this.insertStyle(text_to_insert);
  }


  render() {
    return (
      <div className={'wrapper-container ' + this.props.animClass}>
         <div id="editor-wrap" className={'flexbox-wrap ' + this.props.theme + ' ' + this.props.editorView}>
           <Header id='editor-header' head="Editor" headerClass={this.props.theme+'-headers'} onClick={this.expandEditor}/>
           <Editor markdown={this.props.markdown} ref={this.textarea} onClick={this.handleClick} textareaClass={this.props.theme} headerClass={this.props.theme+'-headers'}
           onChange={this.handleChange}  switchTheme={this.switchTheme} toggleInfo={this.toggleInfo}/>
         </div>
         <div id="previewer-wrap" className={'flexbox-wrap ' + this.props.theme + ' ' + this.props.previewerView}>
           <Header id='previewer-header' head="Previewer" headerClass={this.props.theme +'-headers'} onClick={this.expandPreviewer}/>
           <Previewer markdown={this.props.markdown} />
         </div>
       </div>
    );
  }
}

export default Wrapper;
