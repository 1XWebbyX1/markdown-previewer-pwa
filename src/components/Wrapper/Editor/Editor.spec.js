// External Depedencies
import React from 'react';
import { mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Editor from './Editor';


configure({ adapter: new Adapter() });

describe('Editor', () => {
  let app;
  const mockOnChangeFunc = jest.fn();
  const mockClickFunc = jest.fn();
  const mockToggleFunc = jest.fn();
  const mockSwitchFunc = jest.fn();

  beforeEach(() => {
    const props = {
      markdown: 'mockMarkdown',
      onChange: mockOnChangeFunc,
      textareaClass: 'mock-class',
      headerClass: 'mock-header-class',
      onClick: mockClickFunc,
      toggleInfo: mockToggleFunc,
      switchTheme: mockSwitchFunc
    };
    app = mount(
      <Editor {...props}/>
    );
  })

  afterEach(() => {
    app.unmount();
  })

  it('should initialize the texarea with right attributes and value', () => {
    const input = app.find('textarea').first();
    expect(input).to.have.value("mockMarkdown");
    expect(input).to.have.className('mock-class');
    expect(input).to.have.attr('type', 'text');
  })

  it('should render and initialize Toolbar with right class', () => {
    const toolbar = app.find('Toolbar');
    expect(toolbar.length).to.equal(1);
    expect(toolbar).to.have.className('mock-header-class');
  })

  it('render correct prop types', () => {
    expect(typeof app.props().markdown).to.equal('string');
    expect(typeof app.props().onChange).to.equal('function');
    expect(typeof app.props().textareaClass).to.equal('string');
    expect(typeof app.props().headerClass).to.equal('string');
    expect(typeof app.props().onClick).to.equal('function');
    expect(typeof app.props().toggleInfo).to.equal('function');
    expect(typeof app.props().switchTheme).to.equal('function');
});


})
