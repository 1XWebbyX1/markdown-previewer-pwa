// External Depedencies
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from './utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
import sinon from 'sinon'
// Our Component
import Wrapper from './Wrapper';


configure({ adapter: new Adapter() });

describe('Wrapper', () => {
  let app;

  beforeEach(() => {
    const props = {
      animClass: 'mock-animation-class',
      theme: 'theme-class',
      editorView: 'editor-view-mode-class',
      previewerView: 'previewer-view-mode-class',
      markdown: 'mockMarkdown'
    };
    app = shallow(
      <Wrapper {...props}/>
    );
  })

  it('should initialize with right attributes', () => {
    expect(app).to.have.className('mock-animation-class');
    expect(app.find('#editor-wrap')).to.have.className('theme-class editor-view-mode-class');
    expect(app.find('#previewer-wrap')).to.have.className('theme-class previewer-view-mode-class');
  })

  it("renders right number of nested components", () => {
    expect(app).to.have.exactly(1).descendants('Previewer');
    expect(app).to.have.exactly(2).descendants('Header');
  })

  describe('when state changes and others events occur', () => {
    const mockAddTextFunc = jest.fn(),
     mockSetViewFunc = jest.fn(),
     mocktoggleAnimFunc = jest.fn(),
     mockSwitchThemeFunc = jest.fn(),
     spyInsertStyle = sinon.spy(Wrapper.prototype, 'insertStyle'),
     spyInsertAtCaret = sinon.spy(Wrapper.prototype, 'insertAtCaret'),
     spyTextSelect = sinon.spy(Wrapper.prototype, 'setTextSelect');

    beforeEach(() => {
      const props = {
        animClass: 'mock-anim-class',
        theme: 'dark',
        editorView: 'editor-view-mode-class',
        previewerView: 'previewer-view-mode-class',
        markdown: 'mockMarkdown',
        addText: mockAddTextFunc,
        setView: mockSetViewFunc,
        toggleAnimClass: mocktoggleAnimFunc,
        switchTheme: mockSwitchThemeFunc
      };
      app = mount(
        <Wrapper {...props}/>
      );
    })

    afterEach(() => {
      mockAddTextFunc.mockClear();
      mockSetViewFunc.mockClear();
      mocktoggleAnimFunc.mockClear();
      mockSwitchThemeFunc.mockClear();
      app.unmount();
    })

    it('should have expected initial state', () => {
      expect(app.props().animClass).to.equal('mock-anim-class');
      expect(app.props().theme).to.equal('dark');
      expect(app.props().editorView).to.equal('editor-view-mode-class');
      expect(app.props().previewerView).to.equal('previewer-view-mode-class');
      expect(app.props().markdown).to.equal('mockMarkdown');
    })

  it('should call handleChange once onChange and update value', () => {
    const input = app.find('textarea').first();
    let value = 'mockMarkdown';
    input.simulate('change', {
        target: { value }
      });
    expect(input.props().value).to.equal(value);
    expect(mockAddTextFunc.mock.calls.length).to.equal(1);
  });

  it('inserts text at caret position on bold icon click', () => {
      const icon = app.find('.bold').first();
      icon.simulate('click'); //first click to insert
      expect(spyInsertStyle.calledOnce).to.be.true;
      expect(spyInsertStyle.getCalls()[0].args[0]).to.equal('**Strong Text**');
      expect(spyInsertAtCaret.calledOnce).to.be.true;
      expect(spyTextSelect.calledOnce).to.be.true;
      icon.simulate('click'); //second click for undo
      expect(spyInsertAtCaret.calledOnce).to.be.true; //insertAtCaret not called again
      expect(spyTextSelect.calledTwice).to.be.true; //directly goes to setTextSelect to undo
    })

  it('should call switchTheme once toggle icon click and update theme class', () => {
    const icon = app.find('.toggle').first();
    icon.simulate('click');
    expect(mocktoggleAnimFunc.mock.calls.length).to.equal(1);
    expect(mocktoggleAnimFunc.mock.calls[0][0]).to.equal('blinks');
    expect(mockSwitchThemeFunc.mock.calls.length).to.equal(1);
    expect(mockSwitchThemeFunc.mock.calls[0][0]).to.equal('light');
  });

  describe('when expand editor icon is clicked', () => {
    it('should call setView with empty strings as params', () => {
     const icon = app.find('.arrows').first();
     icon.simulate('click');
     expect(mockSetViewFunc.mock.calls.length).to.equal(1);
     expect(mockSetViewFunc.mock.calls[0][0]).to.equal('');
     expect(mockSetViewFunc.mock.calls[0][1]).to.equal('');
   });

    it('should call setView with fullScreen and minimize as params when editorView is empty string', () => {
     const icon = app.find('.arrows').first();
     app.setProps({editorView: ''});
     icon.simulate('click');
     expect(mockSetViewFunc.mock.calls.length).to.equal(1);
     expect(mockSetViewFunc.mock.calls[0][0]).to.equal('fullScreen');
     expect(mockSetViewFunc.mock.calls[0][1]).to.equal('minimize');
    });
  })

  describe('when expand previewer icon is clicked', () => {
    it('should call setView with empty strings as params', () => {
     const icon = app.find('.arrows').at(2);
     icon.simulate('click');
     expect(mockSetViewFunc.mock.calls.length).to.equal(1);
     expect(mockSetViewFunc.mock.calls[0][0]).to.equal('');
     expect(mockSetViewFunc.mock.calls[0][1]).to.equal('');
   });

    it('should call setView with fullScreen and minimize as params when previewerView is empty string', () => {
     const icon = app.find('.arrows').at(2);
     app.setProps({previewerView: ''});
     icon.simulate('click');
     expect(mockSetViewFunc.mock.calls.length).to.equal(1);
     expect(mockSetViewFunc.mock.calls[0][0]).to.equal('minimize');
     expect(mockSetViewFunc.mock.calls[0][1]).to.equal('fullScreen');
    });
  })
})
})
