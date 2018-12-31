import React from 'react'
import $ from 'jquery'
import asyncComponent from './asyncComponent/async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faInfoCircle, faSave, faArrowLeft  } from '@fortawesome/free-solid-svg-icons'




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



class Background extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      markdown: placeholder,
      info: faInfoCircle,
      placeholder: placeholder
    };
    this.handleChange = this.handleChange.bind(this);
    this.switchTheme = this.switchTheme.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.save = this.save.bind(this);
    this.animate = this.animate.bind(this);
    this.goEditorFullScreen = this.goEditorFullScreen.bind(this);
    this.goPreviewFullScreen = this.goPreviewFullScreen.bind(this);
    this.theme = 'dark';
    this.fullScreen = false;
    this.on = true;
    this.back = false;
  }

  //handle change of input in editor--------------
  handleChange(e){
    this.props.addText(e.target.value);
  }

  //toggle info --------------
  toggleInfo() {
    if(this.props.markdown !== info){
       this.props.addText(info);
    }
    else this.props.addText(this.state.placeholder);

    if(this.state.info === faArrowLeft){
      this.setState({
        info: faInfoCircle
      })
    }else{
      this.setState({
        info: faArrowLeft
      })
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
          <FontAwesomeIcon id="save" icon={faSave} onClick={this.save} />
          <FontAwesomeIcon id="info" onClick={this.toggleInfo} icon={this.state.info} />
          <FontAwesomeIcon id="theme-switch" icon={faToggleOn} onClick={this.switchTheme} />
         </div>
        <div class="parent">
         <Editor markdown={this.props.markdown} onChange={this.handleChange} onClick={this.goEditorFullScreen}/>
         <Preview markdown={this.props.markdown} onClick={this.goPreviewFullScreen}/>
        </div>
       </div>
    );
  }
};


export default Background;
