import React from 'react'
import $ from 'jquery'
import asyncComponent from './asyncComponent/async'
import '@fortawesome/fontawesome-free/css/all.css'



//async imports -____________________________________________________________
const Editor = asyncComponent(() =>
        import('./Editor').then(module => module.default)
        );

const Preview = asyncComponent(() =>
       import('./Previewer').then(module => module.default)
       );

var placeholder;
 import('../data/strings')
                .then((module) => {
                  placeholder = module.placeholder;
                });
var info;
  import('../data/strings')
     .then((module) => {
        info = module.info;
    });

var darkScheme;
  import('../data/themes')
       .then((module) => {
            darkScheme = module.darkScheme;
      });

  var lightScheme;
    import('../data/themes')
       .then((module) => {
          lightScheme = module.lightScheme;
      });

//---------------------------------------------------------------------------

// GLOBAL VARS
const buttonTypes = {
  'fa fa-bold': '**',
  'fa fa-italic': '_',
  'fa fa-quote-left': '> ',
};
const buttonStyles = {
  'fa fa-bold': 'Strong Text',
  'fa fa-italic': 'Emphasized Text',
  'fa fa-quote-left': 'Block Quote',
};


class Background extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      markdown: placeholder,
      placeholder: placeholder,
      lastClicked: ''
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
    else this.props.addText(this.state.placeholder);
    $('#info').toggleClass('fa-info-circle');
    $('#info').toggleClass('fa-arrow-left');
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
    field.focus();
    var selection = document.selection.createRange();
    selection.text = value;
  }else if(field.selectionStart || field.selectionStart == '0'){ //other browser support
    let startPos = field.selectionStart;
    SSM.save('position', startPos);
    let endPos = field.selectionEnd;
    let index = /[^`>*_\s-(1. )]/i.exec(value).index;
    field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
    field.focus();
    this.setTextSelect(startPos + index, startPos + value.length - index);
  }else {
    field.value += value;
  }
}


setTextSelect(caretStart, caretEnd){
  var field = document.getElementById('textarea');
  if(caretStart == -1){
    caretStart = SSM.get('position');
    field.focus();
    field.setSelectionRange(caretStart, caretStart);
  }else if(field.selectionStart){
    field.focus();
    field.setSelectionRange(caretStart, caretEnd);
  }else field.focus();
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
  let symbol = buttonTypes[e.target.className];
  let style = buttonStyles[e.target.className];
  let stylePhrase = e.target.className == 'fa fa-bold' ||
                      e.target.className == 'fa fa-italic' ||
                      e.target.className == 'fa fa-code' ?
                      symbol+style+symbol : '\n' + symbol+style;
  let userSelection = this.getSelectionText();
  var field = document.getElementById('textarea');
  let startPos = field.selectionStart;
  let endPos = field.selectionEnd;
  let lastStyle = SSM.get('style');

  SSM.insertCaretStore(
      startPos + symbol.length, endPos + symbol.length,
      startPos, endPos
    );

    // INSERT / UNDO INSERT MARKUP TEMPLATE
   if (this.state.lastClicked == 'insert' || this.state.lastClicked == 'undo insert') {
     if (this.state.lastClicked == 'insert' && lastStyle == e.target.className) {
       var value = field.value.substring(0, startPos - SSM.get('insert').length) + field.value.substring(startPos - SSM.get('insert').length).replace(SSM.get('insert'), '');
       this.props.addText(value);
       this.setState({
          lastClicked: 'undo insert'
        });
       setTimeout( () => this.setTextSelect(-1, -1), 100); //update the caret position
     } else {
       this.inserter(stylePhrase, e.target.className);
     }
  }else { //to insert the first time
   this.inserter(stylePhrase, e.target.className);
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
         <div id='taskbar'>
          <i id="save" class='fa fa-save' onClick={this.save}></i>
          <i id="info" onClick={this.toggleInfo} class='fa fa-info-circle'></i>
          <i id="bold" onClick={this.handleClick} className='fa fa-bold'></i>
          <i id="italic" onClick={this.handleClick} className='fa fa-italic'></i>
          <i id="quote" onClick={this.handleClick} className='fa fa-quote-left'></i>
          <i id="theme-switch" class='fa-toggle-on' onClick={this.switchTheme}></i>
         </div>
        <div class="parent">
         <Editor markdown={this.props.markdown} onChange={this.handleChange} onClick={this.goEditorFullScreen}/>
         <Preview markdown={this.props.markdown} onClick={this.goPreviewFullScreen}/>
        </div>
       </div>
    );
  }
};


class SessionStorageManager {

  insertCaretStore(p1, p2, p3, p4){
    this.p1 = sessionStorage.setItem('startPos', p1);
    this.p2 = sessionStorage.setItem('endPos', p2);
    this.p3 = sessionStorage.setItem('undoStart', p3);
    this.p4 = sessionStorage.setItem('undoEnd', p4);
  }

  selectionCaretStore(p12, p13, p14){
    this.p12 = sessionStorage.setItem('style', p12);
    this.p13 = sessionStorage.setItem('lastStartPos', p13);
    this.p14 = sessionStorage.setItem('lastSelection', p14);
  }

  save(key, item){
    sessionStorage.setItem(key, item);
  }

  get(key){
    return sessionStorage.getItem(key);
  }

  clear(key){
    sessionStorage.removeItem(key);
  }
}

const SSM = new SessionStorageManager();



export default Background;
