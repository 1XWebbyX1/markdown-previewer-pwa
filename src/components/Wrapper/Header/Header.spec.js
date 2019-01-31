// External Depedencies
import React from 'react';
import {mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Header from './Header';


configure({ adapter: new Adapter() });

describe('Header', () => {
  let app;

  it("renders correctly", () => {
     const output = renderer.create(
         <Header head="mockHeader"/>
   ).toJSON();
     expect(output).to.matchSnapshot(); //to check component renders correctly with right props
  });

  beforeEach(() => {
    const props = {
      id: 'mockId',
      headerClass: 'mock-class',
      onClick: () => {},
      head: 'mockHeading'
    };
    app = mount(<Header {...props}/>);
  })

  afterEach(() => {
    app.unmount();
  })

  it('should initialize the header with right attributes and value', () => {
    expect(app).to.have.id("mockId");
    expect(app).to.have.className('mock-class');
    expect(app.find('h3')).to.have.text('mockHeading');
  })

  it('renders correct prop types', () => {
    expect(typeof app.props().id).to.equal('string');
    expect(typeof app.props().onClick).to.equal('function');
    expect(typeof app.props().head).to.equal('string');
    expect(typeof app.props().headerClass).to.equal('string');
});


})
