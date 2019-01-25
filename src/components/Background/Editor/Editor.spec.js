// External Depedencies
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Editor from './Editor';


configure({ adapter: new Adapter() });

describe('Editor', () => {
  let app;
  const mockOnChangeFunc = jest.fn();
  const mockOnClickFunc = jest.fn();

  beforeEach(() => {
    app = mount(
      <Editor markdown="mockMarkdown" onClick={mockOnClickFunc} onChange={mockOnChangeFunc}/>
    );
  })

  afterEach(() => {
    app.unmount();
  })

  it('renders nested components', () => {
    expect(app.find('Toolbar').length).to.equal(1);
  });

  it('should initialize the value of texarea input to the markdown value', () => {
    const input = app.find('textarea').first();
    expect(input).to.have.value("mockMarkdown");
  })

})
