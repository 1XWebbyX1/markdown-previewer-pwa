// External Depedencies
import React from 'react';
import { mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Previewer from './Previewer';


configure({ adapter: new Adapter() });

describe('Previewer', () => {

  it("renders correctly", () => {
     const output = renderer.create(
         <Previewer markdown="mockMarkdown"/>
   ).toJSON();
     expect(output).to.matchSnapshot(); //to check inner html is set to mockMarkdown
  });

  it('type of markdown is not null or undefined', () => {
    const app = mount(<Previewer markdown="mockMarkdown"/>);
    expect(typeof app.props().markdown).to.not.equal('undefined');
    expect(typeof app.props().markdown).to.not.equal('null');
  });

})
