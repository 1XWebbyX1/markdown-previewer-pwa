import React from 'react'
import $ from 'jquery'
import SessionStorageManager from './sessionStorageManager'
import Editor from './Editor'
import Preview from './Previewer'
import Taskbar from './Taskbar'
import {faInfoCircle, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const SSM = new SessionStorageManager();


var placeholder;
var info;

 import('../data/strings')
  .then((module) => {
    placeholder = module.placeholder;
    info = module.info;
  });


var darkScheme;
var lightScheme;

  import('../data/themes')
  .then((module) => {
      darkScheme = module.darkScheme;
      lightScheme = module.lightScheme;
  });

//---------------------------------------------------------------------------

// TASKBAR buttons vars
const buttonTypes = {
  'fa fa-bold': '**',
  'fa fa-italic': '_',
  'fa fa-quote-left': '> ',
  'fa fa-link': '[link]',
  'fa fa-image': '![Alt Text]',
  'fa fa-list-ol': '1. ',
  'fa fa-list': '- ',
  'fa fa-code': '`'
};
const buttonStyles = {
  'fa fa-bold': 'Strong Text',
  'fa fa-italic': 'Emphasized Text',
  'fa fa-quote-left': 'Block Quote',
  'fa fa-link': '(http://)',
  'fa fa-image': '(http://)',
  'fa fa-list-ol': 'List Item',
  'fa fa-list': 'List Item',
  'fa fa-code': 'Inline Code'
};


class Background extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      markdown: placeholder,
      placeholder: this.markdown,
      lastClicked: '',
      icon: faInfoCircle
    };
    this.handleChange = this.handleChange.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.insertAtCursor = this.insertAtCursor.bind(this);
    this.setTextSelect = this.setTextSelect.bind(this);
    this.getSelectionText = this.getSelectionText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.inserter = this.inserter.bind(this);
    this.save = this.save.bind(this);
    this.animate = this.animate.bind(this);
    this.goEditorFullScreen = this.goEditorFullScreen.bind(this);
    this.goPreviewFullScreen = this.goPreviewFullScreen.bind(this);
    this.theme = 'dark';
    this.fullScreen = false;
    this.on = true;
    this.back = false;
    this.undo = true;
  }

  //handle change of input in editor--------------
  handleChange(e){
    this.props.addText(e.target.value);
    SSM.save('style', '');
  }

  //toggle info --------------
  toggleInfo() {
    if(this.props.markdown !== info){
       this.props.addText(info);
    }
    else {
      console.log(this.state.placeholder);
      this.props.addText(placeholder);
    }
}

  goEditorFullScreen(){
    this.fullScreen = !this.fullScreen;
    if(this.fullScreen){
      $('.editor').css('height', '100vh');
      $('.preview').css('height', '0');
    }else{
      $('.editor').css('height', '49.5%');
      $('.preview').css('height', '49.8%');
    }
  }

  goPreviewFullScreen(){
    this.fullScreen = !this.fullScreen;
    if(this.fullScreen){
     $('.preview').css('height', '100vh');
     $('.editor').css('height', '0');
   }else{
     $('.editor').css('height', '49.5%');
     $('.preview').css('height', '49.8%');
   }
  }


insertAtCursor(value){
  var field = document.getElementById('textarea');
  if(document.selection){ //older IE support
    field.focus({preventScroll:true});
    var selection = document.selection.createRange();
    selection.text = value;
  }else if(field.selectionStart || field.selectionStart == '0'){ //other browsers
    let startPos = field.selectionStart;
    SSM.save('position', startPos);
    let endPos = field.selectionEnd;
    let index = /[^`>*_\s-(1. )]/i.exec(value).index;
    field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
    field.focus({preventScroll:true});
    this.setTextSelect(startPos + index, startPos + value.length - index);
  }else {
    field.value += value;
  }
}


setTextSelect(caretStart, caretEnd){
  var field = document.getElementById('textarea');
  if(caretStart == -1){
    caretStart = SSM.get('position');
    field.setSelectionRange(caretStart, caretStart);
  }else if(field.selectionStart){
    field.setSelectionRange(caretStart, caretEnd);
  }
}

getSelectionText(){
  let text = '';
  var field = document.getElementById('textarea');
  text = field.value.slice(field.selectionStart, field.selectionEnd);
  return text;
}

inserter(_stylePhrase, buttonType) {
    setTimeout( () => this.insertAtCursor(_stylePhrase), 100);
    if(SSM.get('insert')){
      SSM.clear('insert');
      SSM.save('insert', _stylePhrase);
    }
    else{
      SSM.save('insert', _stylePhrase);
    }
    SSM.save('style', buttonType);
    this.setState({lastClicked: 'insert'})
  }

handleClick(e){
  //e.stopPropagation();
  var target = (buttonTypes[e.target.className] == undefined) ? e.target.parentElement||e.target : e.target.parentElement||e.target;
  console.log(target);
  let symbol = buttonTypes[target.className];
  let style = buttonStyles[target.className];

  let stylePhrase = target.className == 'fa fa-bold' ||
                      target.className == 'fa fa-italic' ||
                      target.className == 'fa fa-code' ?
                      symbol+style+symbol : '\n'+ symbol+style;
  if(target.className == 'fa fa-link') {
    stylePhrase = symbol+style;
  }
  let userSelection = this.getSelectionText();
  var field = document.getElementById('textarea');
  let startPos = field.selectionStart;
  let endPos = field.selectionEnd;
  let lastStyle = SSM.get('style');

  SSM.insertCaretStore(
      startPos + symbol.length, endPos + symbol.length,
      startPos, endPos
    );

    // INSERT / UNDO INSERT
   if (this.state.lastClicked == 'insert' || this.state.lastClicked == 'undo insert') {
     if (this.state.lastClicked == 'insert' && lastStyle == target.className) {
       var value = field.value.substring(0, startPos - SSM.get('insert').length) + field.value.substring(startPos - SSM.get('insert').length).replace(SSM.get('insert'), '');
       this.props.addText(value);
       this.setState({
          lastClicked: 'undo insert'
        });
       setTimeout( () => this.setTextSelect(-1, -1), 0); //update the caret position
     } else {
       this.inserter(stylePhrase, target.className);
     }
  }else { //to insert the first time
   this.inserter(stylePhrase, target.className);
 }
}


  //handle switch for theme change ------------------
  switchTheme(){
    if(this.theme === 'dark') {
        for(let obj in lightScheme){
           document.documentElement.style.setProperty(obj, lightScheme[obj]);
         }
         this.theme = 'light';
    } else {
         for(let obj in darkScheme){
            document.documentElement.style.setProperty(obj, darkScheme[obj]);
          }
         this.theme = 'dark';
   }
        //toggle blink animation ----------------------------------------
   import ('../sass/03-utilities/_animations.scss')
      .then(this.animate);
}



save(){
       this.setState({placeholder : $('.editor textarea').text()});
 }



 animate(){
   $(".back").addClass('blinks');
   setTimeout(function() {
     $(".back").removeClass('blinks');
   }, 2000);
}

  render() {
    return (
       <div class="back">
         <Taskbar onClick={this.handleClick} toggleInfo={this.toggleInfo} switchTheme={this.switchTheme} save={this.save} icon={this.state.icon}/>
        <div class="parent">
         <Editor markdown={this.props.markdown} onChange={this.handleChange} onClick={this.goEditorFullScreen}/>
         <Preview markdown={this.props.markdown} onClick={this.goPreviewFullScreen}/>
        </div>
       </div>
    );
  }
};



export default Background;
